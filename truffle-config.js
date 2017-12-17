module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    //contracts_build_directory: 'src/client-side-generated/contracts',
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*",
        },
        private: {
            host: "18.194.167.176",
            port: 8545,
            network_id: "*",
            from: '0x76b37EfF2F3f5B0eF4b1319fFa6336a491ABEfE7',
            gas: 2000000
        }

    }
};
