
import axios from "axios";

export interface CardData {
  card: string;
  cvv: string;
  expiry_date: string;
  pin?: string | null;
}

export const fetchCardsApi = async () => {
  const res = await axios.get("https://api.partner.kashishindiapvtltd.com/api/card");
  return res.data?.data || [];
};



export const cardApi = {
  updateStatus: async (id: string, status: string) => {
    const res = await axios.put(
      `https://api.partner.kashishindiapvtltd.com/api/card/update-status/${id}`,
      {status } // <-- sending both id & status
    );
    return res.data;
  },
  deleteCard: async (id: string) => {
    const res = await axios.delete(
      `https://api.partner.kashishindiapvtltd.com/api/card/${id}`,
    );
    return res.data;
  }
};


// 👇 API call isolated in a separate service
export const addCardApi = async (data: CardData) => {
  const res = await axios.post(
    "https://api.partner.kashishindiapvtltd.com/api/card",
    data
  );
  return res.data;
};


export const updateCardService = async (data: {
  id: string;
  card: string;
  cvv: string;
  expiry_date: string;
  pin?: string | null;
}) => {
  const res = await axios.put(
    `https://api.partner.kashishindiapvtltd.com/api/card/${data.id}`,
    data
  );
  return res.data;
};