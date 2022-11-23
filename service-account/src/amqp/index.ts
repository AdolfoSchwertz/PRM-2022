import amqp, {Channel, Connection} from 'amqplib'


let channel: Channel;

const connect = async () => {
    const conn: Connection = await amqp.connect('amqp://localhost');
    channel = await conn.createChannel()

}

//conecta no rabbitmq
connect()
    .then(() => {
        console.log('conectado ao rabbitmq e pronto para consumi-lo')
    })
    .catch(error => {
        console.log('não foi possivel conectar a fila')
    })

//envia uma mensagem a fila

const sendToQueue = async (message: string) => {
    await channel.assertQueue('prm-customer')
    return channel.sendToQueue('prm-customer', Buffer.from(message));
}

export {sendToQueue}