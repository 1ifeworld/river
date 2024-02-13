import sdk from "../client";

export async function getMarqueeData() {
  const response = await sdk.marqueeData();

  return {
    users: response.userCounters,
    channels: response.channelCounters,
    items: response.itemCounters,
  };
}
