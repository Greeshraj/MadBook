import React from 'react';
// import { View, Text, Image, Button } from 'react-native';
// import RazorpayCheckout from 'react-native-razorpay';
// import TshirtImg from './tshirt.svg'; //
// import client from '../api/client';
// import useRazorpay from "react-razorpay";

const Payment = ({ navigation, route }) => {

  // const amount = 500;
  // const currency = "INR";
  // const receiptId = "qwsaq1";
  // const [Razorpay] = useRazorpay();
  
  // const paymentHandler = async () => {
  //     try {
  //       const response = await client.post('/order', {
  //         amount,
  //         currency,
  //         receipt: receiptId,
  //       });
  //     const order = await response.data;
  //     // console.log(order);

  //     const options = {
  //       description: "Test Transaction",
  //       image: "https://example.com/your_logo",
  //       currency,
  //       key: "rzp_test_Pggd6aT1U9xQ1O",
  //       amount,
  //       name: "Acme Corp",
  //       order_id: order.id,
  //       prefill: {
  //         name: "Web Dev Matrix",
  //         email: "webdevmatrix@example.com",
  //         contact: "9000000000",
  //       },
  //       notes: {
  //         address: "Razorpay Corporate Office",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };

  //     // console.log(options)
  //     // RazorpayCheckout.open(options).then((response) => {
  //     //   console.log(response);
  //     // }).catch((error) => {
  //     //   // handle failure
  //     //   alert(error)
  //     //   console.log(error);
  //     // });
  //     const rzp1 = new Razorpay(options);

  // rzp1.on("payment.failed", function (response) {
  //   alert(response.error.code);
  //   alert(response.error.description);
  //   alert(response.error.source);
  //   alert(response.error.step);
  //   alert(response.error.reason);
  //   alert(response.error.metadata.order_id);
  //   alert(response.error.metadata.payment_id);
  // });

  // rzp1.open();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    // <View style={{ alignItems: 'center' }}>
    // <Text>Tshirt</Text>
    <View>
    <Text>Solid blue cotton Tshirt</Text>
    {/* <Image source={TshirtImg} style={{ width: 100, height: 100 }} />
    <Button title='helleo' onPress={paymentHandler}> */}

{/* // </Button> */}
  </View>
  );
};

export default Payment;
