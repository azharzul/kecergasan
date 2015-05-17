var bluetoothle;

var jqmReady = $.Deferred();
var pgReady = $.Deferred();

var app =
{
  callback: null,
  initialize: function(callback)
  {
    this.callback = callback;

    //If testing on a desktop, automatically resolve PhoneGap
    if (document.URL.match(/^https?:/) || document.URL.match(/^file:/))
    {
      pgReady.resolve();
    }
    //Else if on a mobile device, add event listener for deviceready
    else
    {
      document.addEventListener("deviceready", onDeviceReady, false);
    }
  }
};

$(document).on("pagecreate", function()
{
  //Resolve jQuery Mobile
  jqmReady.resolve();
  $(document).off("pagecreate");
});

$.when(jqmReady, pgReady).then(function()
{
  //When PhoneGap and jQuery Mobile are resolved, start the app
  if (app.callback !== null)
  {
    app.callback();
  }
});

function onDeviceReady()
{
  //Resolve PhoneGap after deviceready has fired
  pgReady.resolve();
}

app.initialize(function()
{
  $("a.gegar").on("vclick", gegar);

  $("a.initialize").on("vclick", initialize);

  $("a.enable").on("vclick", enable);

  $("a.disable").on("vclick", disable);

  $("a.startScan").on("vclick", startScan);

  $("a.stopScan").on("vclick", stopScan);

  $("a.retrieveConnected").on("vclick", retrieveConnected);

  $("a.isInitialized").on("vclick", isInitialized);

  $("a.isEnabled").on("vclick", isEnabled);

  $("a.isScanning").on("vclick", isScanning);

  $(document).on("vclick", "a.connect", function()
  {
    var address = getAddress($(this));

    connect(address);

    return false;
  });

  $(document).on("vclick", "a.reconnect", function()
  {
    var address = getAddress($(this));

    reconnect(address);

    return false;
  });

  $(document).on("vclick", "a.disconnect", function()
  {
    var address = getAddress($(this));

    disconnect(address);

    return false;
  });

  $(document).on("vclick", "a.close", function()
  {
    var address = getAddress($(this));

    close(address);

    return false;
  });

  $(document).on("vclick", "a.discover", function()
  {
    var address = getAddress($(this));

    discover(address);

    return false;
  });

  $(document).on("vclick", "a.services", function()
  {
    var address = getAddress($(this));

    services(address);

    return false;
  });

  $(document).on("vclick", "a.rssi", function()
  {
    var address = getAddress($(this));

    rssi(address);

    return false;
  });

  $(document).on("vclick", "a.isConnected", function()
  {
    var address = getAddress($(this));

    isConnected(address);

    return false;
  });

  $(document).on("vclick", "a.isDiscovered", function()
  {
    var address = getAddress($(this));

    isDiscovered(address);

    return false;
  });

  $(document).on("vclick", "a.characteristics", function()
  {
    var address = getAddress($(this));
    var serviceUuid = getServiceUuid($(this));

    characteristics(address, serviceUuid);

    return false;
  });

  $(document).on("vclick", "a.read", function()
  {
    var address = getAddress($(this));
    var serviceUuid = getServiceUuid($(this));
    var characteristicUuid = getCharacteristicUuid($(this));

    read(address, serviceUuid, characteristicUuid);

    return false;
  });

  $(document).on("vclick", "a.subscribe", function()
  {
    var address = getAddress($(this));
    var serviceUuid = getServiceUuid($(this));
    var characteristicUuid = getCharacteristicUuid($(this));

    subscribe(address, serviceUuid, characteristicUuid);

    return false;
  });

  $(document).on("vclick", "a.unsubscribe", function()
  {
    var address = getAddress($(this));
    var serviceUuid = getServiceUuid($(this));
    var characteristicUuid = getCharacteristicUuid($(this));

    unsubscribe(address, serviceUuid, characteristicUuid);

    return false;
  });

  $(document).on("vclick", "a.write", function()
  {
    var address = getAddress($(this));
    var serviceUuid = getServiceUuid($(this));
    var characteristicUuid = getCharacteristicUuid($(this));

    var bytes = new Uint8Array(1);
    bytes[0] = 0;
    var value = bluetoothle.bytesToEncodedString(bytes);

    write(address, serviceUuid, characteristicUuid, value);

    return false;
  });

  $(document).on("vclick", "a.descriptors", function()
  {
    var address = getAddress($(this));
    var serviceUuid = getServiceUuid($(this));
    var characteristicUuid = getCharacteristicUuid($(this));

    descriptors(address, serviceUuid, characteristicUuid);

    return false;
  });

  $(document).on("vclick", "a.readDescriptor", function()
  {
    var address = getAddress($(this));
    var serviceUuid = getServiceUuid($(this));
    var characteristicUuid = getCharacteristicUuid($(this));
    var descriptorUuid = getDescriptorUuid($(this));

    readDescriptor(address, serviceUuid, characteristicUuid, descriptorUuid);

    return false;
  });

  $(document).on("vclick", "a.writeDescriptor", function()
  {
    var address = getAddress($(this));
    var serviceUuid = getServiceUuid($(this));
    var characteristicUuid = getCharacteristicUuid($(this));
    var descriptorUuid = getDescriptorUuid($(this));

    var bytes = new Uint8Array(1);
    bytes[0] = 0;
    var value = bluetoothle.bytesToEncodedString(bytes);

    writeDescriptor(address, serviceUuid, characteristicUuid, descriptorUuid, value);

    return false;
  });

  $(document).on("vclick", ".toggle", function()
  {
    var $item = $(this);

    if ($item.hasClass("active"))
    {
      $item.removeClass("active");
    }
    else
    {
      $item.addClass("active");
    }
  });
});

function writeLogBox(msg)
{
  $(".logBox").append(msg);
  var textarea = document.getElementById('logBox');
  textarea.scrollTop = textarea.scrollHeight;
}

function gegar()
{
  aXinitialize();
  //connect('88:0F:10:1D:23:58');
  //discover('88:0F:10:1D:23:58');
}


function aXinitialize()
{
  var paramsObj = {request:true};

  writeLogBox("\n" + "Initialize : " + JSON.stringify(paramsObj));

  bluetoothle.initialize(aXinitializeSuccess, aXinitializeError, paramsObj);

  return false;
}

function aXinitializeSuccess(obj)
{
  writeLogBox("\n" + "Initialize Success : " + JSON.stringify(obj));

  if (obj.status == "enabled")
  {
    writeLogBox("\n" + "Enabled");
    aXconnect('88:0F:10:1D:23:58');
  }
  else
  {
    writeLogBox("\n" + "Unexpected Initialize Status");
  }
}

function aXinitializeError(obj)
{
  writeLogBox("\n" + "Initialize Error : " + JSON.stringify(obj));
}

function aXconnect(address)
{
  var paramsObj = {address:address};

   writeLogBox("\n" + "Connect : " + JSON.stringify(paramsObj));

  bluetoothle.connect(aXconnectSuccess, aXconnectError, paramsObj);

  return false;
}

function aXconnectSuccess(obj)
{
  writeLogBox("\n" + "Connect Success : " + JSON.stringify(obj));

  if (obj.status == "connected")
  {
    writeLogBox("\n" + "Connected");
    aXdiscover('88:0F:10:1D:23:58');
  }
  else if (obj.status == "connecting")
  {
    writeLogBox("\n" + "Connecting");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Connect Status");
  }
}

function aXconnectError(obj)
{
  writeLogBox("\n" + "Connect Error : " + JSON.stringify(obj));
}

function aXdiscover(address)
{
  var paramsObj = {address:address};

  writeLogBox("\n" + "Discover : " + JSON.stringify(paramsObj));

  bluetoothle.discover(discoverSuccess, discoverError, paramsObj);

  return false;
}

function aXdiscoverSuccess(obj)
{
  writeLogBox("\n" + "Discover Success : " + JSON.stringify(obj));

  if (obj.status == "discovered")
  {
    writeLogBox("\n" + "Discovered");

    var address = obj.address;

    var services = obj.services;

    for (var i = 0; i < services.length; i++)
    {
      var service = services[i];

      addService(address, service.serviceUuid);

      var characteristics = service.characteristics;

      for (var j = 0; j < characteristics.length; j++)
      {
        var characteristic = characteristics[j];

        addCharacteristic(address, service.serviceUuid, characteristic.characteristicUuid);

        var descriptors = characteristic.descriptors;

        for (var k = 0; k < descriptors.length; k++)
        {
          var descriptor = descriptors[k];

          addDescriptor(address, service.serviceUuid, characteristic.characteristicUuid, descriptor.descriptorUuid);
        }
      }
    }

    aXwrite('88:0F:10:1D:23:58', 'fee0', 'ff05', '8, 2');
  }
  else
  {
    writeLogBox("\n" + "Unexpected Discover Status");
  }
}

function aXdiscoverError(obj)
{
  writeLogBox("\n" + "Discover Error : " + JSON.stringify(obj));
}

function aXwrite(address, serviceUuid, characteristicUuid, value)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, value:value};

  writeLogBox("\n" + "Write : " + JSON.stringify(paramsObj));

  bluetoothle.write(writeSuccess, writeError, paramsObj);

  return false;
}

function aXwriteSuccess(obj)
{
  writeLogBox("\n" + "Write Success : " + JSON.stringify(obj));

  if (obj.status == "written")
  {
    writeLogBox("\n" + "Written");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Write Status");
  }
}

function aXwriteError(obj)
{
  writeLogBox("\n" + "Write Error : " + JSON.stringify(obj));
}










function initialize()
{
  var paramsObj = {request:true};

  writeLogBox("\n" + "Initialize : " + JSON.stringify(paramsObj));

  bluetoothle.initialize(initializeSuccess, initializeError, paramsObj);

  return false;
}

function initializeSuccess(obj)
{
  writeLogBox("\n" + "Initialize Success : " + JSON.stringify(obj));

  if (obj.status == "enabled")
  {
    writeLogBox("\n" + "Enabled");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Initialize Status");
  }
}

function initializeError(obj)
{
  writeLogBox("\n" + "Initialize Error : " + JSON.stringify(obj));
}

function enable()
{
  writeLogBox("\n" + "Enable");

  bluetoothle.enable(enableSuccess, enableError);

  return false;
}

function enableSuccess(obj)
{
  writeLogBox("\n" + "Enable Success : " + JSON.stringify(obj));

  if (obj.status == "enabled")
  {
    writeLogBox("\n" + "Enabled");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Enable Status");
  }
}

function enableError(obj)
{
  writeLogBox("\n" + "Enable Error : " + JSON.stringify(obj));
}

function disable()
{
  writeLogBox("\n" + "Disable");

  bluetoothle.disable(disableSuccess, disableError);

  return false;
}

function disableSuccess(obj)
{
  writeLogBox("\n" + "Disable Success : " + JSON.stringify(obj));

  if (obj.status == "disabled")
  {
    writeLogBox("\n" + "Disabled");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Disable Status");
  }
}

function disableError(obj)
{
  writeLogBox("\n" + "Disable Error : " + JSON.stringify(obj));
}

function startScan()
{
  //TODO Disconnect / Close all addresses and empty

  var paramsObj = {serviceUuids:[]};

  writeLogBox("\n" + "Start Scan : " + JSON.stringify(paramsObj));

  bluetoothle.startScan(startScanSuccess, startScanError, paramsObj);

  return false;
}

function startScanSuccess(obj)
{
  console.log("Start Scan Success : " + JSON.stringify(obj));

  if (obj.status == "scanResult")
  {
    console.log("Scan Result");

    addDevice(obj.address, obj.name);
  }
  else if (obj.status == "scanStarted")
  {
    console.log("Scan Started");
  }
  else
  {
    console.log("Unexpected Start Scan Status");
  }
}

function startScanError(obj)
{
  writeLogBox("\n" + "Start Scan Error : " + JSON.stringify(obj));
}

function stopScan()
{
  writeLogBox("\n" + "Stop Scan");

  bluetoothle.stopScan(stopScanSuccess, stopScanError);

  return false;
}

function stopScanSuccess(obj)
{
  writeLogBox("\n" + "Stop Scan Success : " + JSON.stringify(obj));

  if (obj.status == "scanStopped")
  {
    writeLogBox("\n" + "Scan Stopped");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Stop Scan Status");
  }
}

function stopScanError(obj)
{
  writeLogBox("\n" + "Stop Scan Error : " + JSON.stringify(obj));
}

function retrieveConnected()
{
  //TODO Add to readme that at least one is required
  var paramsObj = {serviceUuids:["180D"]};

  writeLogBox("\n" + "Retrieve Connected : " + JSON.stringify(paramsObj));

  bluetoothle.retrieveConnected(retrieveConnectedSuccess, retrieveConnectedError, paramsObj);

  return false;
}

function retrieveConnectedSuccess(obj)
{
  writeLogBox("\n" + "Retrieve Connected Success : " + JSON.stringify(obj));

  for (var i = 0; i < obj.length; i++)
  {
    addDevice(obj[i]);
  }
}

function retrieveConnectedError(obj)
{
  writeLogBox("\n" + "Retrieve Connected Error : " + JSON.stringify(obj));
}

function isInitialized()
{
  writeLogBox("\n" + "Is Initialized");

  bluetoothle.isInitialized(isInitializedSuccess);

  return false;
}

function isInitializedSuccess(obj)
{
  writeLogBox("\n" + "Is Initialized Success : " + JSON.stringify(obj));

  if (obj.isInitialized)
  {
    writeLogBox("\n" + "Is Initialized : true");
  }
  else
  {
    writeLogBox("\n" + "Is Initialized : false");
  }
}

function isEnabled()
{
  writeLogBox("\n" + "Is Enabled");

  bluetoothle.isEnabled(isEnabledSuccess);

  return false;
}

function isEnabledSuccess(obj)
{
  writeLogBox("\n" + "Is Enabled Success : " + JSON.stringify(obj));

  if (obj.isEnabled)
  {
    writeLogBox("\n" + "Is Enabled : true");
  }
  else
  {
    writeLogBox("\n" + "Is Enabled : false");
  }
}

function isScanning()
{
  writeLogBox("\n" + "Is Scanning");

  bluetoothle.isScanning(isScanningSuccess);

  return false;
}

function isScanningSuccess(obj)
{
  writeLogBox("\n" + "Is Scanning Success : " + JSON.stringify(obj));

  if (obj.isScanning)
  {
    writeLogBox("\n" + "Is Scanning : true");
  }
  else
  {
    writeLogBox("\n" + "Is Scanning : false");
  }
}

function connect(address)
{
  var paramsObj = {address:address};

   writeLogBox("\n" + "Connect : " + JSON.stringify(paramsObj));

  bluetoothle.connect(connectSuccess, connectError, paramsObj);

  return false;
}

function connectSuccess(obj)
{
  writeLogBox("\n" + "Connect Success : " + JSON.stringify(obj));

  if (obj.status == "connected")
  {
    writeLogBox("\n" + "Connected");
  }
  else if (obj.status == "connecting")
  {
    writeLogBox("\n" + "Connecting");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Connect Status");
  }
}

function connectError(obj)
{
  writeLogBox("\n" + "Connect Error : " + JSON.stringify(obj));
}

function reconnect(address)
{
  var paramsObj = {address:address};

  writeLogBox("\n" + "Reconnect : " + JSON.stringify(paramsObj));

  bluetoothle.reconnect(reconnectSuccess, reconnectError, paramsObj);

  return false;
}

function reconnectSuccess(obj)
{
  writeLogBox("\n" + "Reconnect Success : " + JSON.stringify(obj));

  if (obj.status == "connected")
  {
    writeLogBox("\n" + "Connected");
  }
  else if (obj.status == "connecting")
  {
    writeLogBox("\n" + "Connecting");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Reconnect Status");
  }
}

function reconnectError(obj)
{
  writeLogBox("\n" + "Reconnect Error : " + JSON.stringify(obj));
}

function disconnect(address)
{
  var paramsObj = {address:address};

  writeLogBox("\n" + "Disconnect : " + JSON.stringify(paramsObj));

  bluetoothle.disconnect(disconnectSuccess, disconnectError, paramsObj);

  return false;
}

function disconnectSuccess(obj)
{
  writeLogBox("\n" + "Disconnect Success : " + JSON.stringify(obj));

  if (obj.status == "disconnected")
  {
    writeLogBox("\n" + "Disconnected");
  }
  else if (obj.status == "disconnecting")
  {
    writeLogBox("\n" + "Disconnecting");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Disconnect Status");
  }
}

function disconnectError(obj)
{
  writeLogBox("\n" + "Disconnect Error : " + JSON.stringify(obj));
}

function close(address)
{
  var paramsObj = {address:address};

  writeLogBox("\n" + "Close : " + JSON.stringify(paramsObj));

  bluetoothle.close(closeSuccess, closeError, paramsObj);

  return false;
}

function closeSuccess(obj)
{
  writeLogBox("\n" + "Close Success : " + JSON.stringify(obj));

  if (obj.status == "closed")
  {
    writeLogBox("\n" + "Closed");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Close Status");
  }
}

function closeError(obj)
{
  writeLogBox("\n" + "Close Error : " + JSON.stringify(obj));
}

function discover(address)
{
  var paramsObj = {address:address};

  writeLogBox("\n" + "Discover : " + JSON.stringify(paramsObj));

  bluetoothle.discover(discoverSuccess, discoverError, paramsObj);

  return false;
}

function discoverSuccess(obj)
{
  writeLogBox("\n" + "Discover Success : " + JSON.stringify(obj));

  if (obj.status == "discovered")
  {
    writeLogBox("\n" + "Discovered");

    var address = obj.address;

    var services = obj.services;

    for (var i = 0; i < services.length; i++)
    {
      var service = services[i];

      addService(address, service.serviceUuid);

      var characteristics = service.characteristics;

      for (var j = 0; j < characteristics.length; j++)
      {
        var characteristic = characteristics[j];

        addCharacteristic(address, service.serviceUuid, characteristic.characteristicUuid);

        var descriptors = characteristic.descriptors;

        for (var k = 0; k < descriptors.length; k++)
        {
          var descriptor = descriptors[k];

          addDescriptor(address, service.serviceUuid, characteristic.characteristicUuid, descriptor.descriptorUuid);
        }
      }
    }
  }
  else
  {
    writeLogBox("\n" + "Unexpected Discover Status");
  }
}

function discoverError(obj)
{
  writeLogBox("\n" + "Discover Error : " + JSON.stringify(obj));
}

function services(address)
{
  var paramsObj = {address:address, serviceUuids:[]};

  writeLogBox("\n" + "Services : " + JSON.stringify(paramsObj));

  bluetoothle.services(servicesSuccess, servicesError, paramsObj);

  return false;
}

function servicesSuccess(obj)
{
  writeLogBox("\n" + "Services Success : " + JSON.stringify(obj));

  if (obj.status == "services")
  {
    writeLogBox("\n" + "Services");

    var serviceUuids = obj.serviceUuids;

    for (var i = 0; i < serviceUuids.length; i++)
    {
      addService(obj.address, serviceUuids[i]);
    }
  }
  else
  {
    writeLogBox("\n" + "Unexpected Services Status");
  }
}

function servicesError(obj)
{
  writeLogBox("\n" + "Services Error : " + JSON.stringify(obj));
}

function rssi(address)
{
  var paramsObj = {address:address};

  writeLogBox("\n" + "RSSI : " + JSON.stringify(paramsObj));

  bluetoothle.rssi(rssiSuccess, rssiError, paramsObj);

  return false;
}

function rssiSuccess(obj)
{
  writeLogBox("\n" + "RSSI Success : " + JSON.stringify(obj));

  if (obj.status == "rssi")
  {
    writeLogBox("\n" + "RSSI");
  }
  else
  {
    writeLogBox("\n" + "Unexpected RSSI Status");
  }
}

function rssiError(obj)
{
  writeLogBox("\n" + "RSSI Error : " + JSON.stringify(obj));
}

function isConnected(address)
{
  var paramsObj = {address:address};

  writeLogBox("\n" + "Is Connected : " + JSON.stringify(paramsObj));

  bluetoothle.isConnected(isConnectedSuccess, paramsObj);

  return false;
}

function isConnectedSuccess(obj)
{
  writeLogBox("\n" + "Is Connected Success : " + JSON.stringify(obj));

  if (obj.isConnected)
  {
    writeLogBox("\n" + "Is Connected : true");
  }
  else
  {
    writeLogBox("\n" + "Is Connected : false");
  }
}

function isDiscovered(address)
{
  var paramsObj = {address:address};

  writeLogBox("\n" + "Is Discovered : " + JSON.stringify(paramsObj));

  bluetoothle.isDiscovered(isDiscoveredSuccess, paramsObj);

  return false;
}

function isDiscoveredSuccess(obj)
{
  writeLogBox("\n" + "Is Discovered Success : " + JSON.stringify(obj));

  if (obj.isDiscovered)
  {
    writeLogBox("\n" + "Is Discovered : true");
  }
  else
  {
    writeLogBox("\n" + "Is Discovered : false");
  }
}

function characteristics(address, serviceUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuids:[]};

  writeLogBox("\n" + "Characteristics : " + JSON.stringify(paramsObj));

  bluetoothle.characteristics(characteristicsSuccess, characteristicsError, paramsObj);

  return false;
}

function characteristicsSuccess(obj)
{
  writeLogBox("\n" + "Characteristics Success : " + JSON.stringify(obj));

  if (obj.status == "characteristics")
  {
    writeLogBox("\n" + "Characteristics");

    var characteristics = obj.characteristics;

    for (var i = 0; i < characteristics.length; i++)
    {
      addCharacteristic(obj.address, obj.serviceUuid, characteristics[i].characteristicUuid);
    }
  }
  else
  {
    writeLogBox("\n" + "Unexpected Characteristics Status");
  }
}

function characteristicsError(obj)
{
  writeLogBox("\n" + "Characteristics Error : " + JSON.stringify(obj));
}

function descriptors(address, serviceUuid, characteristicUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

  writeLogBox("\n" + "Descriptors : " + JSON.stringify(paramsObj));

  bluetoothle.descriptors(descriptorsSuccess, descriptorsError, paramsObj);

  return false;
}

function descriptorsSuccess(obj)
{
  writeLogBox("\n" + "Descriptors Success : " + JSON.stringify(obj));

  if (obj.status == "descriptors")
  {
    writeLogBox("\n" + "Descriptors");

    var descriptorUuids = obj.descriptorUuids;

    for (var i = 0; i < descriptorUuids.length; i++)
    {
      addDescriptor(obj.address, obj.serviceUuid, obj.characteristicUuid, descriptorUuids[i]);
    }
  }
  else
  {
    writeLogBox("\n" + "Unexpected Descriptors Status");
  }
}

function descriptorsError(obj)
{
  writeLogBox("\n" + "Descriptors Error : " + JSON.stringify(obj));
}

function read(address, serviceUuid, characteristicUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

  writeLogBox("\n" + "Read : " + JSON.stringify(paramsObj));

  bluetoothle.read(readSuccess, readError, paramsObj);

  return false;
}

function readSuccess(obj)
{
  writeLogBox("\n" + "Read Success : " + JSON.stringify(obj));

  if (obj.status == "read")
  {
    /*var bytes = bluetoothle.encodedStringToBytes(obj.value);
    writeLogBox("\n" + "Read : " + bytes[0]);*/

    writeLogBox("\n" + "Read");
    theTemp = bluetoothle.encodedStringToBytes(obj.value);
    theBytes = JSON.stringify(theTemp);
    theTemp = bluetoothle.bytesToString(theTemp);
    writeLogBox("\n" + theBytes+"\n"+theTemp);
  }
  else
  {
    writeLogBox("\n" + "Unexpected Read Status");
  }
}

function readError(obj)
{
  writeLogBox("\n" + "Read Error : " + JSON.stringify(obj));
}

function subscribe(address, serviceUuid, characteristicUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

  writeLogBox("\n" + "Subscribe : " + JSON.stringify(paramsObj));

  bluetoothle.subscribe(subscribeSuccess, subscribeError, paramsObj);

  return false;
}

function subscribeSuccess(obj)
{
  writeLogBox("\n" + "Subscribe Success : " + JSON.stringify(obj));

  if (obj.status == "subscribedResult")
  {
    writeLogBox("\n" + "Subscribed Result");
  }
  else if (obj.status == "subscribed")
  {
    writeLogBox("\n" + "Subscribed");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Subscribe Status");
  }
}

function subscribeError(obj)
{
  writeLogBox("\n" + "Subscribe Error : " + JSON.stringify(obj));
}

function unsubscribe(address, serviceUuid, characteristicUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

  writeLogBox("\n" + "Unsubscribe : " + JSON.stringify(paramsObj));

  bluetoothle.unsubscribe(unsubscribeSuccess, unsubscribeError, paramsObj);

  return false;
}

function unsubscribeSuccess(obj)
{
  writeLogBox("\n" + "Unsubscribe Success : " + JSON.stringify(obj));

  if (obj.status == "unsubscribed")
  {
    writeLogBox("\n" + "Unsubscribed");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Unsubscribe Status");
  }
}

function unsubscribeError(obj)
{
  writeLogBox("\n" + "Unsubscribe Error : " + JSON.stringify(obj));
}

function write(address, serviceUuid, characteristicUuid, value)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, value:value};

  writeLogBox("\n" + "Write : " + JSON.stringify(paramsObj));

  bluetoothle.write(writeSuccess, writeError, paramsObj);

  return false;
}

function writeSuccess(obj)
{
  writeLogBox("\n" + "Write Success : " + JSON.stringify(obj));

  if (obj.status == "written")
  {
    writeLogBox("\n" + "Written");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Write Status");
  }
}

function writeError(obj)
{
  writeLogBox("\n" + "Write Error : " + JSON.stringify(obj));
}

function readDescriptor(address, serviceUuid, characteristicUuid, descriptorUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, descriptorUuid:descriptorUuid};

  writeLogBox("\n" + "Read Descriptor : " + JSON.stringify(paramsObj));

  bluetoothle.readDescriptor(readDescriptorSuccess, readDescriptorError, paramsObj);

  return false;
}

function readDescriptorSuccess(obj)
{
  writeLogBox("\n" + "Read Descriptor Success : " + JSON.stringify(obj));

  if (obj.status == "readDescriptor")
  {
    writeLogBox("\n" + "Read Descriptor");
    theTemp = bluetoothle.encodedStringToBytes(obj.value);
    theBytes = JSON.stringify(theTemp);
    theTemp = bluetoothle.bytesToString(theTemp);
    writeLogBox("\n" + theBytes+"\n"+theTemp);
  }
  else
  {
    writeLogBox("\n" + "Unexpected Read Descriptor Status");
  }
}

function readDescriptorError(obj)
{
  writeLogBox("\n" + "Read Descriptor Error : " + JSON.stringify(obj));
}

function writeDescriptor(address, serviceUuid, characteristicUuid, descriptorUuid, value)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, descriptorUuid:descriptorUuid, value:value};

  writeLogBox("\n" + "Write Descriptor : " + JSON.stringify(paramsObj));

  bluetoothle.writeDescriptor(writeDescriptorSuccess, writeDescriptorError, paramsObj);

  return false;
}

function writeDescriptorSuccess(obj)
{
  writeLogBox("\n" + "Write Descriptor Success : " + JSON.stringify(obj));

  if (obj.status == "writeDescriptor")
  {
    writeLogBox("\n" + "Write Descriptor");
  }
  else
  {
    writeLogBox("\n" + "Unexpected Write Descriptor Status");
  }
}

function writeDescriptorError(obj)
{
  writeLogBox("\n" + "Write Descriptor Error : " + JSON.stringify(obj));
}

function addDevice(address, name)
{
  var $devices = $(".devices");

  var $check = $devices.find("li[data-address='{0}']".format(address));
  if ($check.length > 0)
  {
    return;
  }

  var template = $("#device").text().format(address, name);

  $devices.append(template);
}

function getAddress($item)
{
  return $item.parents("li[data-address]").attr("data-address");
}

function addService(address, serviceUuid)
{
  var $devices = $(".devices");

  var $services = $devices.find("li[data-address='{0}'] ul.services".format(address));

  var $check = $services.find("li[data-serviceUuid='{0}']".format(serviceUuid));
  if ($check.length > 0)
  {
    return;
  }

  var template = $("#service").text().format(serviceUuid);

  $services.append(template);
}

function getServiceUuid($item)
{
  return $item.parents("li[data-serviceUuid]").attr("data-serviceUuid");
}

function addCharacteristic(address, serviceUuid, characteristicUuid)
{
  var $devices = $(".devices");

  var $services = $devices.find("li[data-address='{0}'] ul.services".format(address));

  var $characteristics = $services.find("li[data-serviceUuid='{0}'] ul.characteristics".format(serviceUuid));

  var $check = $characteristics.find("li[data-characteristicUuid='{0}']".format(characteristicUuid));
  if ($check.length > 0)
  {
    return;
  }

  var template = $("#characteristic").text().format(characteristicUuid);

  $characteristics.append(template);
}

function getCharacteristicUuid($item)
{
  return $item.parents("li[data-characteristicUuid]").attr("data-characteristicUuid");
}

function addDescriptor(address, serviceUuid, characteristicUuid, descriptorUuid)
{
  var $devices = $(".devices");

  var $services = $devices.find("li[data-address='{0}'] ul.services".format(address));

  var $characteristics = $services.find("li[data-serviceUuid='{0}'] ul.characteristics".format(serviceUuid));

  var $descriptors = $characteristics.find("li[data-characteristicUuid='{0}'] ul.descriptors".format(characteristicUuid));

  var $check = $descriptors.find("li[data-descriptorUuid='{0}']".format(descriptorUuid));
  if ($check.length > 0)
  {
    return;
  }

  var template = $("#descriptor").text().format(descriptorUuid);

  $descriptors.append(template);
}

function getDescriptorUuid($item)
{
  return $item.parents("li[data-descriptorUuid]").attr("data-descriptorUuid");
}

String.prototype.format = function()
{
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number)
  {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
};
