import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleStorageContract from './client-side-generated/contracts/SimpleStorage.json'
import TopicFactoryContract from './client-side-generated/contracts/TopicFactory.json'
import TopicContract from './client-side-generated/contracts/Topic.json'
import getWeb3 from './utils/getWeb3'
import nameUtils from './utils/name-utils';

class App extends Component {

    constructor() {
        super();
        this.state = { errors:[] };
    }
    async componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        try {
            this.web3 = (await getWeb3).web3;
            console.log(this.web3);
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
        const contract = require('truffle-contract');
        const simpleStorage = contract(SimpleStorageContract);
        simpleStorage.setProvider(this.web3.currentProvider);

        const topicFactory = contract(TopicFactoryContract);
        topicFactory.setProvider(this.web3.currentProvider);

        const topic = contract(TopicContract);
        console.log(topic);
        topic.setProvider(this.web3.currentProvider);

        this.topic = topic;

        // Declaring this for later so we can chain functions on SimpleStorage.
        //var simpleStorageInstance;
        //var topicFactoryInstance;
        const instance = await topicFactory.deployed();
        this.topicFactoryInstance = instance;
        await this.refreshTopics();
    }

    refreshTopics() {
        const toAscii = (hex) => {
            return nameUtils.toAsciiTrimmed(hex);
        };

        var topicAddresses;
        return this.topicFactoryInstance.contracts().then(items => {
            topicAddresses = items;
            console.log(topicAddresses);
        }).then(() => {
            return Promise.all(topicAddresses.map((address) => this.topic.at(address)))
                .then((items) => items.map(_ => _.name())).then((items) => Promise.all(items));
        }).then((names) => {
            this.setState({
                topics: names.map((name, i) => {
                    return {name: toAscii(name), address: topicAddresses[i]}
                })
            });
        }).then(console.log).catch((err) => {
            this.showError(err);
        });
    }

    render() {
        const {errors} = this.state || {};
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
            </div>
        );
    }
}

export default App;
