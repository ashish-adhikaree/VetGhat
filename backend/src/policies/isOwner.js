"use strict";

/**
 * `isOwner` policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  strapi.log.info("In isOwner policy.");
  const { user, auth } = policyContext.state;
  const { params } = policyContext;
  
  // this case the userId is the same as the id we are requesting
  // other cases would need more extensive validation...
  const canDoSomething = user.id == params.id;

  if (canDoSomething) {
    return true;
  }

  return false;
};
