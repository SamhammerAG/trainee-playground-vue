module.exports = {
    devServer: {
        public: '0.0.0.0:8080', // to accept connections from outside container
        devServer: {
            watchOptions: {
                ignored: /node_modules/,
                aggregateTimeout: 500,
                poll: 1000
            }
        }
    }
}