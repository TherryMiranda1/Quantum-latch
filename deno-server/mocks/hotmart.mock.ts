import { HotmartWebhookDTO } from "../src/types/Hotmart.ts";

export const HOTMART_WEBHOOK_MOCK: HotmartWebhookDTO = {
  id: "b39ea6da-4f29-495f-ad39-17d23b9cf62b",
  creation_date: 1730313469939,
  event: "PURCHASE_COMPLETE",
  version: "2.0.0",
  data: {
    product: {
      id: 0,
      ucode: "fb056612-bcc6-4217-9e6d-2a5d1110ac2f",
      name: "Produto test postback2",
      has_co_production: false,
    },
    affiliates: [
      {
        affiliate_code: "Q58388177J",
        name: "Affiliate name",
      },
    ],
    buyer: {
      email: "testeComprador271101postman15@example.com",
      name: "Teste Comprador",
      checkout_phone: "99999999900",
      address: {
        country: "Brasil",
        country_iso: "BR",
      },
    },
    producer: {
      name: "Producer Test Name",
    },
    commissions: [
      {
        value: 149.5,
        source: "MARKETPLACE",
        currency_value: "BRL",
      },
      {
        value: 1350.5,
        source: "PRODUCER",
        currency_value: "BRL",
      },
    ],
    purchase: {
      approved_date: 1511783346000,
      full_price: {
        value: 1500,
        currency_value: "BRL",
      },
      price: {
        value: 1500,
        currency_value: "BRL",
      },
      checkout_country: {
        name: "Brasil",
        iso: "BR",
      },
      order_bump: {
        is_order_bump: true,
        parent_purchase_transaction: "HP02316330308193",
      },
      original_offer_price: {
        value: 1500,
        currency_value: "BRL",
      },
      order_date: 1511783344000,
      status: "COMPLETED",
      transaction: "HP16015479281022",
      payment: {
        installments_number: 12,
        type: "CREDIT_CARD",
      },
      offer: {
        code: "test",
      },
      sckPaymentLink: "sckPaymentLinkTest",
    },
    subscription: {
      status: "ACTIVE",
      plan: {
        id: 123,
        name: "plano de teste",
      },
      subscriber: {
        code: "I9OT62C3",
      },
    },
  },
};
