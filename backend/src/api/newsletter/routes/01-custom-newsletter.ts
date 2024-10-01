module.exports = {
  routes: [
    {
      method: "GET",
      path: "/newsletter/subscriber/:email",
      handler: "newsletter.getSubscriberByEmail",
    },
  ],
};
