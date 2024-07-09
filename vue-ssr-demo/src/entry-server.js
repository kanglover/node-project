import { createApp } from './app';

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp(context);
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();

            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }

            Promise.all(
                matchedComponents.map(
                    ({ asyncData }) =>
                        asyncData &&
                        asyncData({
                            store,
                            route: router.currentRoute,
                        })
                )
            ).then(() => {
                context.state = store.state;
                resolve(app);
            }).catch(reject);
        });
    });
};
