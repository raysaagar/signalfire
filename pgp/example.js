function initializeOpenPGP() {
  openpgp.init();
}

function printm(msg) {
  console.log(msg);
}

// function showMessages(str) {
//   //$('#debug').append(str);
//   printm(str);
// }

// pass in 1 for algo to use RSA because nothing else is supported....
// leave password as blank for now.
function generateKeyPair(algo, size, name, email, password) {
  if (window.crypto.getRandomValues) {
    var name_email_pair = name + " <" + email + ">";
    var keypair = openpgp.generate_key_pair(algo, size, name_email_pair, password);
    return keypair;
  }
  else {
    return failAndWarn();
  }
}

// utility functions to get armored keys
function getArmoredPublicKey(keypair) {
  return keypair.publicKeyArmored;
}

function getArmoredPrivateKey(keypair) {
  return keypair.privateKeyArmored;
}

function getUnarmoredPrivateKey(keypair) {
  return keypair.privateKey.valueOf();
}



// need a private armored key - password should be blank for now
function decrypt(privateKey, ciphertext, password) {
  if (window.crypto.getRandomValues) {
    var priv_key = openpgp.read_privateKey(privateKey);

    if (priv_key.length < 1) {
      util.print_error("No private key found!")
      return;
    }

    // here's where the decrypting magic happens. don't ask, just do it.
    var msg = openpgp.read_message(ciphertext);
    var keymat = null;
    var sesskey = null;
    // Find the private (sub)key for the session key of the message
    for (var i = 0; i< msg[0].sessionKeys.length; i++) {
      if (priv_key[0].privateKeyPacket.publicKey.getKeyId() == msg[0].sessionKeys[i].keyId.bytes) {
        keymat = { key: priv_key[0], keymaterial: priv_key[0].privateKeyPacket};
        sesskey = msg[0].sessionKeys[i];
        break;
      }
      for (var j = 0; j < priv_key[0].subKeys.length; j++) {
        if (priv_key[0].subKeys[j].publicKey.getKeyId() == msg[0].sessionKeys[i].keyId.bytes) {
          keymat = { key: priv_key[0], keymaterial: priv_key[0].subKeys[j]};
          sesskey = msg[0].sessionKeys[i];
          break;
        }
      }
    }

    // decrypt the string
    if (keymat != null) {
      if (!keymat.keymaterial.decryptSecretMPIs(password)) {
        util.print_error("Password for secrect key was incorrect!");
        return;
      }
      plaintext = msg[0].decrypt(keymat, sesskey);
      return plaintext;
    } else {
      util.print_error("No private key found!");
    }

  } else {
    return failAndWarn();
  }
}

function failAndWarn() {
  window.alert("Error: Browser not supported\nReason: We need a cryptographically secure PRNG to be implemented (i.e. the window.crypto method)\nSolution: Use Chrome >= 11, Safari >= 3.1 or Firefox >= 21");
  return false;
}

// need a public armored key
function encrypt(publicKey, plaintext) {
  if (window.crypto.getRandomValues) {
    var publicKeyObject = openpgp.read_publicKey(publicKey);
    return openpgp.write_encrypted_message(publicKeyObject, plaintext);
  }
  return failAndWarn();
}

function setup() {
  //openpgp.init();
  initializeOpenPGP();

  keypair2 = generateKeyPair(1, 1024, "Amy Tai", "noob@pton.edu", "");

  printm(keypair2);

  var publicKey = openpgp.read_publicKey(getArmoredPublicKey(keypair2));

  var text = "It is a rare to watch someone secure a freshly installed server right off the bat, yet the world we live in makes this a necessity. So why do so many people put it off until the end, if at all? I’ve done the exact same thing, and it often comes down to wanting to get right into the fun stuff. Hopefully this post will show that it is far easier than you think to secure a server, and can be quite entertaining to look down from your fortress, when the attacks begin to flow."

  var ciphertext = encrypt(getArmoredPublicKey(keypair2), text);

  printm(ciphertext);

  var plaintext = decrypt(getArmoredPrivateKey(keypair2), ciphertext, "");
  printm(plaintext);


  // testing signing
  // printm("testing signing");

  // serverKey = generateKeyPair(1, 1024, "Aeneas Server", "server@aeneas.comp", "")

  // // take requested text and sign with server private key
  // // take requesting user's public key and encrypt message
  // var priv_key_server = openpgp.read_privateKey(getArmoredPrivateKey(serverKey));
  // var pub_key_user = openpgp.read_publicKey(getArmoredPublicKey(keypair2))
  // //openpgp.read_privateKey(getUnarmoredPrivateKey(serverKey))

  // signed_cipher_text = openpgp.write_signed_and_encrypted_message(priv_key_server[0], pub_key_user, "text");
  // printm(signed_cipher_text);
  //signed_cipher_text = openpgp.write_signed_and_encrypted_message(getArmoredPrivateKey(serverKey), publicKey, text);

  // printm(signed_cipher_text);

  // decrypt message with requesting user's private key
  // verify server signature with server pub key

//decrypt code
  // serverPubKey = openpgp.read_publicKey(getArmoredPublicKey(serverKey));
  // if (serverPubKey == null)
  //   util.print_error("Unable to read server public key");
  // openpgp.keyring.importPublicKey(getArmoredPublicKey(serverKey));


  // signed_plaintext = decrypt(getArmoredPrivateKey(keypair2), signed_cipher_text, "");
  // printm(signed_plaintext);


///unit test code
//     printm("BLAH");
//     var priv_key = openpgp.read_privateKey(getArmoredPrivateKey(serverKey));
//     var pub_key = openpgp.read_publicKey(getArmoredPublicKey(keypair2));
//     if (priv_key.length < 1) {
//       util.print_error("No private key found!")
//       return;
//     }
//     if (pub_key < 1) {
//       util.print_error("No public key found!")
//       return;
//     }
//     if (!priv_key[0].decryptSecretMPIs("")) {
//       util.print_error("Password for secrect key was incorrect!");
//       return;
//     }
//     printm(openpgp.write_signed_and_encrypted_message(priv_key[0],pub_key,"test"));

// // unit test decrypt
//     var pub_key = openpgp.read_publicKey(getArmoredPublicKey(serverKey));
//     if (pub_key == null)
//       util.print_error("Unable to read public key");
//     openpgp.keyring.importPublicKey(getArmoredPublicKey(serverKey));


//     var priv_key = openpgp.read_privateKey(getArmoredPrivateKey(keypair2));

//     if (priv_key.length < 1) {
//       util.print_error("No private key found!")
//       return;
//     }

//     var msg = openpgp.read_message(signed_cipher_text);
//     var keymat = null;
//     var sesskey = null;
//     // Find the private (sub)key for the session key of the message
//     for (var i = 0; i< msg[0].sessionKeys.length; i++) {
//       if (priv_key[0].privateKeyPacket.publicKey.getKeyId() == msg[0].sessionKeys[i].keyId.bytes) {
//         keymat = { key: priv_key[0], keymaterial: priv_key[0].privateKeyPacket};
//         sesskey = msg[0].sessionKeys[i];
//         break;
//       }
//       for (var j = 0; j < priv_key[0].subKeys.length; j++) {
//         if (priv_key[0].subKeys[j].publicKey.getKeyId() == msg[0].sessionKeys[i].keyId.bytes) {
//           keymat = { key: priv_key[0], keymaterial: priv_key[0].subKeys[j]};
//           sesskey = msg[0].sessionKeys[i];
//           break;
//         }
//       }
//     }
//     if (keymat != null) {
//       if (!keymat.keymaterial.decryptSecretMPIs("")) {
//         util.print_error("Password for secrect key was incorrect!");
//         return;

//       }
//       printm(msg[0].decrypt(keymat, sesskey));
//     } else {
//       util.print_error("No private key found!");
//     }
}

setup();