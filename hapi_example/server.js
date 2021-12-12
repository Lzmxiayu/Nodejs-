'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('inert');



const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    
    server.register(Inert, () => {});

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });
    server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: '.',
				redirectToSlash: true,
				index: true
			}
		}
	});

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();