import { test, expect } from "../fixtures/fixtures.js";

test.describe("Gateway Full Flow", () => {

  test("Add → Disable → Enable BAFL Gateway", async ({ addgatewayPage, testData, baseURL }) => {

    // 1️⃣ Go to Dashboard
    await addgatewayPage.gotoDashboard(baseURL);

    // 2️⃣ Select Store
    await addgatewayPage.selectStore(testData.storeName);

    // 3️⃣ Navigate to Gateways
    await addgatewayPage.gotoGateways();

    // ⭐ FLOW 1 — ADD GATEWAY
    await addgatewayPage.addGateway(testData.gateway);

    // Verify newly added gateway is Enabled
    await addgatewayPage.verifyGatewayEnabled(testData.gateway.name);



    // ⭐ FLOW 2 — EDIT → DISABLE
    await addgatewayPage.disableGateway(testData.gateway.name);

    // Verify the same latest row becomes Disabled
    await addgatewayPage.verifyGatewayDisabled(testData.gateway.name);



    // ⭐ FLOW 3 — EDIT → ENABLE AGAIN
    await addgatewayPage.enableGateway(testData.gateway.name);

    // Verify it becomes Enabled again
    await addgatewayPage.verifyGatewayEnabled(testData.gateway.name);


    console.log("🎉 FULL GATEWAY FLOW PASSED SUCCESSFULLY");
  });
});
