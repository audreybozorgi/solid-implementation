// Here we define interface class to have a single base class of whatever we want to create later for payment gateway provider
interface IPaymentGateway {
    checkout(): boolean;
}

// Let define new class for MyFatoorah provider and handle all logics of payment gateway here, and just here,
class MyFatoorahGateway implements IPaymentGateway {
    checkout(): boolean {
        console.log('MyFatoorah gateway opened!');
        console.log('MyFatoorah gateway done!');
        return true; // payment successful
    }
}

// Let define new class for KeyNet provider and handle all logics of payment gateway here, and just here,
class KeyNetGateway implements IPaymentGateway {
    checkout(): boolean {
        console.log('KeyNet gateway opened!');
        console.log('KeyNet gateway done!');
        return true; // payment successful
    }
}

// Here we define interface class to have a single base class of whatever we want to create later for notification provider
interface INotificationProvider {
    sendNotification(isSuccess: boolean): void;
}

// Let define new class for SMS provider and handle all logics of notifying SMS here, and just here,
class SMSProvider implements INotificationProvider {
    sendNotification(isSuccess: boolean): void {
        if (isSuccess) console.log('SMS has been sent!');
    }
}

// Let define new class for Email provider and handle all logics of notifying SMS here, and just here,
class EmailProvider implements INotificationProvider {
    sendNotification(isSuccess: boolean): void {
        if (isSuccess) console.log('Email has been sent!');
    }
}

class Checkout {
    // Lets define the types of payment gateway object shapes and types. 
    private paymentGateway: IPaymentGateway;
    private notificationProviders: INotificationProvider[];

    // Here we get payment gateway, we don't care about its type or provider. 
    constructor(paymentGateway: IPaymentGateway, notificationProviders: INotificationProvider[]) { 
        this.paymentGateway = paymentGateway;
        this.notificationProviders = notificationProviders;
    }

    // Here in checkout method I don't care about which payment gateway I have, or what kind of notification I have, 
    // What I care here is two things: 
    // 1. I want to handle payment gateway 
    // 2. I want to notify users. 
    checkout(): boolean {
        let isSuccessful: boolean = this.paymentGateway.checkout(); // handle payment gateway, no matter what provider is it. 

        this.notificationProviders.forEach(provider => {  // handle notifying users, no matter what type ot provider is it.
            provider.sendNotification(isSuccessful);
        });

        return isSuccessful;
    }
}

const myFatoorahGateway = new MyFatoorahGateway();
const keyNetGateway = new KeyNetGateway();
const smsProvider = new SMSProvider();
const emailProvider = new EmailProvider();

const checkoutInstance = new Checkout(myFatoorahGateway, [smsProvider]);
checkoutInstance.checkout();

const checkoutInstance2 = new Checkout(keyNetGateway, [smsProvider, emailProvider]);
checkoutInstance2.checkout();