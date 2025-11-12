import BillFetchApiDocs from "@/components/Docuemtns/BillFetchApiDocs";
import BillPaymentApiDocs from "@/components/Docuemtns/copy/BillFetchApiDocs";

import RechargeApiDocs from "@/components/Docuemtns/rechargeApi";

export default function RechargeDoc() {
  return (
   <>
    <RechargeApiDocs />
    <BillFetchApiDocs/>
    <BillPaymentApiDocs/>
   </>
  );
}




// bill fetch url  https://api.partner.kashishindiapvtltd.com/api/fetchbill?number=500001038890&op_code=139 eh hai

// her hai response------

//tum query dikah do......

// {
//   "message": "fetch",
//   "data": {
//     "status": "Fetched",
//     "billnumber": "500001038890",
//     "amount": "6180.00",
//     "consumerName": "prakashchandra ramchandra swain",
//     "billDate": "2025-09-26",
//     "dueDate": "2025-10-13"
//   },
//   "apistatus": true
// }