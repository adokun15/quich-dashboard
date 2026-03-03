export default function AdminHome() {
  //Checkout after completing the order!
  return (
    <main>
      <p>This is the Admin Home... Everything is here</p>
      <p>Browser is Limited. it can only be authorised for 30mins</p>
      <p>Here are what the browser is for ( Deletion & Update & Read ) </p>
      <ul>
        <li>- Query ( Product, Customers, Orders, Store&Merchant )</li>
        <li>
          - Update Detail( Product(IMAGE), Store settings(Opening hour,
          Community etc) )
        </li>
        <li>- add/Remove Customer from blacklist</li>
        <li>- Manage subscriptions </li>
        <li>- Account Deletion Account; </li>
      </ul>

      <p>
        We dont know merchant name, but we add it to the token anytime they
        create the token, we dont store the Merchant Name;
      </p>
    </main>
  );
}
