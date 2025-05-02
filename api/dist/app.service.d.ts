export declare class AppService {
    getApiInfo(): {
        name: string;
        description: string;
        version: string;
        endpoints: {
            evm: {
                path: string;
                method: string;
                description: string;
            }[];
            cosmos: {
                path: string;
                method: string;
                description: string;
            }[];
        };
        docs: string;
    };
}
