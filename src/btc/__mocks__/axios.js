"use strict";

module.exports = {
  utxos: [{ amount: 1111 }, { amount: 22222 }, { amount: 33333 }],

  get: function(url) {
    return new Promise((resolve, reject) => {
      var address = "address";
      process.nextTick(
        (function() {
          return;
          utxos[0]
            ? resolve(utxos[0])
            : reject({
                error: "utxos " + userID + " not found."
              });
        })()
      );
    });
  }
};
