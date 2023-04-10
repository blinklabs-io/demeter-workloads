import { stsInformer, podInformer } from './informer';
import Operator from './controller';

const operator = new Operator();

const exit = (reason: string) => {
    operator.stop();
    stsInformer.stop();
    podInformer.stop();
    process.exit(0);
};

process.on('SIGTERM', () => exit('SIGTERM')).on('SIGINT', () => exit('SIGINT'));

export default async function start() {
    await stsInformer.start();
    await podInformer.start();
    await operator.start();
}