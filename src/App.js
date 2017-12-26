import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TopicFactoryMeta from 'contracts/TopicFactory';
import TopicContractMeta from 'contracts/Topic';
import getWeb3 from './utils/getWeb3';
import nameUtils from './utils/name-utils';
import contract from 'truffle-contract';
import _ from 'lodash';

class App extends Component {

    constructor() {
        super();
        this.state = { errors:[], topicContracts: [], topics: [] };
    }
    async componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.
        try {
            this.web3 = (await getWeb3).web3;

            const accounts = await this.web3.eth.getAccounts();
            this.setState({accounts: accounts});

            await this.instantiateContract();
        } catch (error) {
            this.showError(error);
        }
    }

    showError(error) {
        console.error(error);
        const errors = this.state.errors;
        errors.push(error);
        this.setState({errors: errors});
    }


    async instantiateContract() {
        /*
         * SMART CONTRACT EXAMPLE
         *
         * Normally these functions would be called in the context of a
         * state management library, but for convenience I've placed them here.
         */

        const TopicFactoryContract = contract(TopicFactoryMeta);
        TopicFactoryContract.setProvider(this.web3.currentProvider);


        const TopicContract = contract(TopicContractMeta);
        TopicContract.setProvider(this.web3.currentProvider);

        this.TopicContract = TopicContract;
        this.TopicFactoryContract = TopicFactoryContract;
        this.topicFactoryContractInstance = (await this.TopicFactoryContract.deployed());

        console.log(this.topicFactoryContractInstance.TopicCreated());
        this.topicFactoryContractInstance.TopicCreated().watch((error, result) => {
            console.log(arguments);

            if (_.isError(error)) {
                this.showError(error);
            }

            this.pushTopic(result.args);
        });

        return this.refreshTopics();
    }

    async refreshTopics() {
        const toAscii = (hex) => {
            return nameUtils.toAsciiTrimmed(hex);
        };

        const topicFactory = await this.TopicFactoryContract.deployed();
        const topicAddresses = await topicFactory.contracts();
        const topicContracts = await Promise.all(topicAddresses.map((address) => this.TopicContract.at(address)));
        const topicNames = await Promise.all(topicContracts.map(_ => _.name()));

        this.setState({
            topicContracts: topicContracts,
            topics: topicNames.map((name, i) => {
                return {name: toAscii(name), address: topicAddresses[i]}
            })
        });
    }

    pushTopic({id, name}) {
        this.setState({
            topicContracts: [...this.state.topicContracts, id],
            topics: [...this.state.topics, { name: nameUtils.toAsciiTrimmed(name), address: id }]
        });
    }

    onNewTopicChanged(e) {
        this.setState({ newTopicName: e.target.value });
    }

    async submitNewTopic() {
        try {
            this.setState({ isSubmittingTopic: true });
            const from = this.state.accounts[0];
            const name = this.state.newTopicName;

            await this.topicFactoryContractInstance.createContract(name, {from});
        } catch (e) {
            this.showError(e);
        } finally {
            this.setState({ isSubmittingTopic: true });
        }

    }

    render() {
        const {errors, accounts, topics, isSubmittingTopic, newTopicName} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {errors && errors.map(item => <li className={'error'}>{item.message}</li>)}

                accounts:
                <ul>
                    {accounts && accounts.map(account =>
                        <li>{account}</li>
                    )}
                </ul>

                topics:
                <input value={newTopicName} onChange={(e) => this.onNewTopicChanged(e)} />
                <button disabled={!isSubmittingTopic && !newTopicName} onClick={() => this.submitNewTopic()}>add</button>
                <ul>
                    {topics && topics.map(({name, address}) =>
                        <li>{name} / {address}</li>
                    )}
                </ul>

            </div>
        );
    }
}

export default App;
