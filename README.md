### Payment Gateway System

This repository contains a project for building a payment gateway system aimed at facilitating seamless financial transactions. Below is a breakdown of the planned features and functionalities:

#### Feature Planning

- **User Login**
  - Authentication via email/phone number.

- **Bank On-Ramp and Off-Ramp**
  - Facilitate depositing into and withdrawing from bank accounts.

- **Transfers via Phone Number/Name**
  - Enable transfers between users using identifiers like phone numbers or names.

- **QR Code Scanning**
  - Support QR code scanning for quick transfers to merchants.

- **Merchant Login**
  - Authentication options include Google login.

- **QR Code Generation**
  - Generate QR codes for merchants to accept payments.

- **Payment Alerts/Notifications**
  - Merchants receive alerts or notifications upon receiving payments.

- **Scheduled Payouts**
  - Automatically transfer merchant balances to their bank accounts every 2 days.

#### High-Value Features

- **Peer-to-Peer Transfers**
  - Allow users to send money to each other securely.

- **Merchant Balance Withdrawal**
  - Enable merchants to withdraw their accumulated balances to their bank accounts.

- **User Balance Withdrawal**
  - Provide users with the option to withdraw their balance back to their bank accounts.

- **Bank Webhooks**
  - Implement webhooks from banks to seamlessly transfer incoming funds.

---


#### Overview

This repository houses a payment gateway system designed to streamline financial transactions. It offers robust features for both users and merchants, ensuring secure and efficient payments.

#### Features

- **User Management**
  - Secure login using email/phone authentication.
  - Bank on-ramp and off-ramp capabilities for easy fund transfers.
  - Transfers via phone number or recipient name.

- **Merchant Services**
  - Google login for merchant authentication.
  - QR code generation for convenient payment acceptance.
  - Real-time alerts and notifications on received payments.
  - Automatic bank transfers every 2 days for merchant balances.

#### Additional Features

- **Advanced Functionality**
  - Peer-to-peer money transfers.
  - Merchant balance withdrawals.
  - User balance withdrawals to bank accounts.
  - Integration of bank webhooks for seamless fund transfers.

#### Getting Started

To get started with the payment gateway system, follow these steps:

1. **Clone the Repository**
   ```
   git clone https://github.com/Padam7890/payNow_Payment_Gateway
   cd repository
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file based on `.env.example` and fill in your configurations.

4. **Run the Application**
   ```
   npm start
   ```

5. **Access the Application**
   - Open your web browser and navigate to `http://localhost:3000` (or the specified port).



## Credit

Developer [Padam Thapa](https://padamthapa.com.np/).



#### Contributing

Contributions are welcome! To contribute to this project, please fork the repository and submit pull requests to the `develop` branch. Ensure your code adheres to the project's coding standards.

#### License

This project is licensed under the MIT License - see the `LICENSE` file for details.

