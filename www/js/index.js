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

function initialize()
{
  var paramsObj = {request:true};

  alert("Initialize : " + JSON.stringify(paramsObj));

  bluetoothle.initialize(initializeSuccess, initializeError, paramsObj);

  return false;
}

function initializeSuccess(obj)
{
  alert("Initialize Success : " + JSON.stringify(obj));

  if (obj.status == "enabled")
  {
    alert("Enabled");
  }
  else
  {
    alert("Unexpected Initialize Status");
  }
}

function initializeError(obj)
{
  alert("Initialize Error : " + JSON.stringify(obj));
}

function enable()
{
  alert("Enable");

  bluetoothle.enable(enableSuccess, enableError);

  return false;
}

function enableSuccess(obj)
{
  alert("Enable Success : " + JSON.stringify(obj));

  if (obj.status == "enabled")
  {
    alert("Enabled");
  }
  else
  {
    alert("Unexpected Enable Status");
  }
}

function enableError(obj)
{
  alert("Enable Error : " + JSON.stringify(obj));
}

function disable()
{
  alert("Disable");

  bluetoothle.disable(disableSuccess, disableError);

  return false;
}

function disableSuccess(obj)
{
  alert("Disable Success : " + JSON.stringify(obj));

  if (obj.status == "disabled")
  {
    alert("Disabled");
  }
  else
  {
    alert("Unexpected Disable Status");
  }
}

function disableError(obj)
{
  alert("Disable Error : " + JSON.stringify(obj));
}

function startScan()
{
  //TODO Disconnect / Close all addresses and empty

  var paramsObj = {serviceUuids:[]};

  alert("Start Scan : " + JSON.stringify(paramsObj));

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
  alert("Start Scan Error : " + JSON.stringify(obj));
}

function stopScan()
{
  alert("Stop Scan");

  bluetoothle.stopScan(stopScanSuccess, stopScanError);

  return false;
}

function stopScanSuccess(obj)
{
  alert("Stop Scan Success : " + JSON.stringify(obj));

  if (obj.status == "scanStopped")
  {
    alert("Scan Stopped");
  }
  else
  {
    alert("Unexpected Stop Scan Status");
  }
}

function stopScanError(obj)
{
  alert("Stop Scan Error : " + JSON.stringify(obj));
}

function retrieveConnected()
{
  //TODO Add to readme that at least one is required
  var paramsObj = {serviceUuids:["180D"]};

  alert("Retrieve Connected : " + JSON.stringify(paramsObj));

  bluetoothle.retrieveConnected(retrieveConnectedSuccess, retrieveConnectedError, paramsObj);

  return false;
}

function retrieveConnectedSuccess(obj)
{
  alert("Retrieve Connected Success : " + JSON.stringify(obj));

  for (var i = 0; i < obj.length; i++)
  {
    addDevice(obj[i]);
  }
}

function retrieveConnectedError(obj)
{
  alert("Retrieve Connected Error : " + JSON.stringify(obj));
}

function isInitialized()
{
  alert("Is Initialized");

  bluetoothle.isInitialized(isInitializedSuccess);

  return false;
}

function isInitializedSuccess(obj)
{
  alert("Is Initialized Success : " + JSON.stringify(obj));

  if (obj.isInitialized)
  {
    alert("Is Initialized : true");
  }
  else
  {
    alert("Is Initialized : false");
  }
}

function isEnabled()
{
  alert("Is Enabled");

  bluetoothle.isEnabled(isEnabledSuccess);

  return false;
}

function isEnabledSuccess(obj)
{
  alert("Is Enabled Success : " + JSON.stringify(obj));

  if (obj.isEnabled)
  {
    alert("Is Enabled : true");
  }
  else
  {
    alert("Is Enabled : false");
  }
}

function isScanning()
{
  alert("Is Scanning");

  bluetoothle.isScanning(isScanningSuccess);

  return false;
}

function isScanningSuccess(obj)
{
  alert("Is Scanning Success : " + JSON.stringify(obj));

  if (obj.isScanning)
  {
    alert("Is Scanning : true");
  }
  else
  {
    alert("Is Scanning : false");
  }
}

function connect(address)
{
  var paramsObj = {address:address};

   alert("Connect : " + JSON.stringify(paramsObj));

  bluetoothle.connect(connectSuccess, connectError, paramsObj);

  return false;
}

function connectSuccess(obj)
{
  alert("Connect Success : " + JSON.stringify(obj));

  if (obj.status == "connected")
  {
    alert("Connected");
  }
  else if (obj.status == "connecting")
  {
    alert("Connecting");
  }
  else
  {
    alert("Unexpected Connect Status");
  }
}

function connectError(obj)
{
  alert("Connect Error : " + JSON.stringify(obj));
}

function reconnect(address)
{
  var paramsObj = {address:address};

  alert("Reconnect : " + JSON.stringify(paramsObj));

  bluetoothle.reconnect(reconnectSuccess, reconnectError, paramsObj);

  return false;
}

function reconnectSuccess(obj)
{
  alert("Reconnect Success : " + JSON.stringify(obj));

  if (obj.status == "connected")
  {
    alert("Connected");
  }
  else if (obj.status == "connecting")
  {
    alert("Connecting");
  }
  else
  {
    alert("Unexpected Reconnect Status");
  }
}

function reconnectError(obj)
{
  alert("Reconnect Error : " + JSON.stringify(obj));
}

function disconnect(address)
{
  var paramsObj = {address:address};

  alert("Disconnect : " + JSON.stringify(paramsObj));

  bluetoothle.disconnect(disconnectSuccess, disconnectError, paramsObj);

  return false;
}

function disconnectSuccess(obj)
{
  alert("Disconnect Success : " + JSON.stringify(obj));

  if (obj.status == "disconnected")
  {
    alert("Disconnected");
  }
  else if (obj.status == "disconnecting")
  {
    alert("Disconnecting");
  }
  else
  {
    alert("Unexpected Disconnect Status");
  }
}

function disconnectError(obj)
{
  alert("Disconnect Error : " + JSON.stringify(obj));
}

function close(address)
{
  var paramsObj = {address:address};

  alert("Close : " + JSON.stringify(paramsObj));

  bluetoothle.close(closeSuccess, closeError, paramsObj);

  return false;
}

function closeSuccess(obj)
{
  alert("Close Success : " + JSON.stringify(obj));

  if (obj.status == "closed")
  {
    alert("Closed");
  }
  else
  {
    alert("Unexpected Close Status");
  }
}

function closeError(obj)
{
  alert("Close Error : " + JSON.stringify(obj));
}

function discover(address)
{
  var paramsObj = {address:address};

  alert("Discover : " + JSON.stringify(paramsObj));

  bluetoothle.discover(discoverSuccess, discoverError, paramsObj);

  return false;
}

function discoverSuccess(obj)
{
  alert("Discover Success : " + JSON.stringify(obj));

  if (obj.status == "discovered")
  {
    alert("Discovered");

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
    alert("Unexpected Discover Status");
  }
}

function discoverError(obj)
{
  alert("Discover Error : " + JSON.stringify(obj));
}

function services(address)
{
  var paramsObj = {address:address, serviceUuids:[]};

  alert("Services : " + JSON.stringify(paramsObj));

  bluetoothle.services(servicesSuccess, servicesError, paramsObj);

  return false;
}

function servicesSuccess(obj)
{
  alert("Services Success : " + JSON.stringify(obj));

  if (obj.status == "services")
  {
    alert("Services");

    var serviceUuids = obj.serviceUuids;

    for (var i = 0; i < serviceUuids.length; i++)
    {
      addService(obj.address, serviceUuids[i]);
    }
  }
  else
  {
    alert("Unexpected Services Status");
  }
}

function servicesError(obj)
{
  alert("Services Error : " + JSON.stringify(obj));
}

function rssi(address)
{
  var paramsObj = {address:address};

  alert("RSSI : " + JSON.stringify(paramsObj));

  bluetoothle.rssi(rssiSuccess, rssiError, paramsObj);

  return false;
}

function rssiSuccess(obj)
{
  alert("RSSI Success : " + JSON.stringify(obj));

  if (obj.status == "rssi")
  {
    alert("RSSI");
  }
  else
  {
    alert("Unexpected RSSI Status");
  }
}

function rssiError(obj)
{
  alert("RSSI Error : " + JSON.stringify(obj));
}

function isConnected(address)
{
  var paramsObj = {address:address};

  alert("Is Connected : " + JSON.stringify(paramsObj));

  bluetoothle.isConnected(isConnectedSuccess, paramsObj);

  return false;
}

function isConnectedSuccess(obj)
{
  alert("Is Connected Success : " + JSON.stringify(obj));

  if (obj.isConnected)
  {
    alert("Is Connected : true");
  }
  else
  {
    alert("Is Connected : false");
  }
}

function isDiscovered(address)
{
  var paramsObj = {address:address};

  alert("Is Discovered : " + JSON.stringify(paramsObj));

  bluetoothle.isDiscovered(isDiscoveredSuccess, paramsObj);

  return false;
}

function isDiscoveredSuccess(obj)
{
  alert("Is Discovered Success : " + JSON.stringify(obj));

  if (obj.isDiscovered)
  {
    alert("Is Discovered : true");
  }
  else
  {
    alert("Is Discovered : false");
  }
}

function characteristics(address, serviceUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuids:[]};

  alert("Characteristics : " + JSON.stringify(paramsObj));

  bluetoothle.characteristics(characteristicsSuccess, characteristicsError, paramsObj);

  return false;
}

function characteristicsSuccess(obj)
{
  alert("Characteristics Success : " + JSON.stringify(obj));

  if (obj.status == "characteristics")
  {
    alert("Characteristics");

    var characteristics = obj.characteristics;

    for (var i = 0; i < characteristics.length; i++)
    {
      addCharacteristic(obj.address, obj.serviceUuid, characteristics[i].characteristicUuid);
    }
  }
  else
  {
    alert("Unexpected Characteristics Status");
  }
}

function characteristicsError(obj)
{
  alert("Characteristics Error : " + JSON.stringify(obj));
}

function descriptors(address, serviceUuid, characteristicUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

  alert("Descriptors : " + JSON.stringify(paramsObj));

  bluetoothle.descriptors(descriptorsSuccess, descriptorsError, paramsObj);

  return false;
}

function descriptorsSuccess(obj)
{
  alert("Descriptors Success : " + JSON.stringify(obj));

  if (obj.status == "descriptors")
  {
    alert("Descriptors");

    var descriptorUuids = obj.descriptorUuids;

    for (var i = 0; i < descriptorUuids.length; i++)
    {
      addDescriptor(obj.address, obj.serviceUuid, obj.characteristicUuid, descriptorUuids[i]);
    }
  }
  else
  {
    alert("Unexpected Descriptors Status");
  }
}

function descriptorsError(obj)
{
  alert("Descriptors Error : " + JSON.stringify(obj));
}

function read(address, serviceUuid, characteristicUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

  alert("Read : " + JSON.stringify(paramsObj));

  bluetoothle.read(readSuccess, readError, paramsObj);

  return false;
}

function readSuccess(obj)
{
  alert("Read Success : " + JSON.stringify(obj));

  if (obj.status == "read")
  {
    /*var bytes = bluetoothle.encodedStringToBytes(obj.value);
    alert("Read : " + bytes[0]);*/

    alert("Read");
    alert(bluetoothle.bytesToString(bluetoothle.encodedStringToBytes(obj.value));
  }
  else
  {
    alert("Unexpected Read Status");
  }
}

function readError(obj)
{
  alert("Read Error : " + JSON.stringify(obj));
}

function subscribe(address, serviceUuid, characteristicUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

  alert("Subscribe : " + JSON.stringify(paramsObj));

  bluetoothle.subscribe(subscribeSuccess, subscribeError, paramsObj);

  return false;
}

function subscribeSuccess(obj)
{
  alert("Subscribe Success : " + JSON.stringify(obj));

  if (obj.status == "subscribedResult")
  {
    alert("Subscribed Result");
  }
  else if (obj.status == "subscribed")
  {
    alert("Subscribed");
  }
  else
  {
    alert("Unexpected Subscribe Status");
  }
}

function subscribeError(obj)
{
  alert("Subscribe Error : " + JSON.stringify(obj));
}

function unsubscribe(address, serviceUuid, characteristicUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid};

  alert("Unsubscribe : " + JSON.stringify(paramsObj));

  bluetoothle.unsubscribe(unsubscribeSuccess, unsubscribeError, paramsObj);

  return false;
}

function unsubscribeSuccess(obj)
{
  alert("Unsubscribe Success : " + JSON.stringify(obj));

  if (obj.status == "unsubscribed")
  {
    alert("Unsubscribed");
  }
  else
  {
    alert("Unexpected Unsubscribe Status");
  }
}

function unsubscribeError(obj)
{
  alert("Unsubscribe Error : " + JSON.stringify(obj));
}

function write(address, serviceUuid, characteristicUuid, value)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, value:value};

  alert("Write : " + JSON.stringify(paramsObj));

  bluetoothle.write(writeSuccess, writeError, paramsObj);

  return false;
}

function writeSuccess(obj)
{
  alert("Write Success : " + JSON.stringify(obj));

  if (obj.status == "written")
  {
    alert("Written");
  }
  else
  {
    alert("Unexpected Write Status");
  }
}

function writeError(obj)
{
  alert("Write Error : " + JSON.stringify(obj));
}

function readDescriptor(address, serviceUuid, characteristicUuid, descriptorUuid)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, descriptorUuid:descriptorUuid};

  alert("Read Descriptor : " + JSON.stringify(paramsObj));

  bluetoothle.readDescriptor(readDescriptorSuccess, readDescriptorError, paramsObj);

  return false;
}

function readDescriptorSuccess(obj)
{
  alert("Read Descriptor Success : " + JSON.stringify(obj));

  if (obj.status == "readDescriptor")
  {
    alert("Read Descriptor");
  }
  else
  {
    alert("Unexpected Read Descriptor Status");
  }
}

function readDescriptorError(obj)
{
  alert("Read Descriptor Error : " + JSON.stringify(obj));
}

function writeDescriptor(address, serviceUuid, characteristicUuid, descriptorUuid, value)
{
  var paramsObj = {address:address, serviceUuid:serviceUuid, characteristicUuid:characteristicUuid, descriptorUuid:descriptorUuid, value:value};

  alert("Write Descriptor : " + JSON.stringify(paramsObj));

  bluetoothle.writeDescriptor(writeDescriptorSuccess, writeDescriptorError, paramsObj);

  return false;
}

function writeDescriptorSuccess(obj)
{
  alert("Write Descriptor Success : " + JSON.stringify(obj));

  if (obj.status == "writeDescriptor")
  {
    alert("Write Descriptor");
  }
  else
  {
    alert("Unexpected Write Descriptor Status");
  }
}

function writeDescriptorError(obj)
{
  alert("Write Descriptor Error : " + JSON.stringify(obj));
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
