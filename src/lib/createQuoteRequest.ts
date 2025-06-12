import type { QuoteResponse, CreateQuotePayload } from "../types";
import { generateRandomId } from "../utils/generateRandomId";
import api from "./api";


export const createQuoteRequest = async (): Promise<QuoteResponse> => {
  const randomRef = generateRandomId(6);

  const payload: CreateQuotePayload = {
    merchantId: "fb140b88-7296-4397-bd9e-47b29a4805ee",
        type: "IN",
        amount: 200,
        currency: "ZAR",
        expiryMinutes: 1,
        reference: `REF${randomRef}`,
        customerId: "123",
        complianceDetails: {
          requesterIpAddress: "127.0.0.1",
          partyDetails: [
            {
              type: "ORIGINATOR",
              firstName: "firstName",
              lastName: "lastName",
              middleName: "middleName",
              entityType: "INDIVIDUAL",
              dateOfBirth: "1983-09-23",
              relationshipType: "SELF_OWNED",
            },
          ],
        },
  };

  const { data } = await api.post('/pay/summary', payload);
  return data;
};
