import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getInfo(): {
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
    health(): {
        status: string;
        timestamp: string;
    };
}
