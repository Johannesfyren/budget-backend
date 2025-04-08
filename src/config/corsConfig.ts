const corsConfig: object = {
    origin: ['http://localhost:5173'], // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: "*",
}

export default corsConfig;