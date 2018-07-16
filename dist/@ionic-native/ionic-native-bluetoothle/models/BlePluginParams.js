// creating temporary enums to avoid ts compiler warning.
// https://github.com/Microsoft/TypeScript/issues/10570
export var InitStatus;
(function (InitStatus) {
    InitStatus["enable"] = "enabled";
    InitStatus["disable"] = "disabled";
})(InitStatus || (InitStatus = {}));
export var StartScanStatus;
(function (StartScanStatus) {
    StartScanStatus["start"] = "scanStarted";
    StartScanStatus["result"] = "scanResult";
})(StartScanStatus || (StartScanStatus = {}));
export var StopScanStatus;
(function (StopScanStatus) {
    StopScanStatus["stop"] = "scanStopped";
})(StopScanStatus || (StopScanStatus = {}));
export var BondStatus;
(function (BondStatus) {
    BondStatus["bonded"] = "bonded";
    BondStatus["bonding"] = "bonding";
    BondStatus["unbonded"] = "unbonded";
})(BondStatus || (BondStatus = {}));
export var UnbondStatus;
(function (UnbondStatus) {
    UnbondStatus["unbonded"] = "unbonded";
})(UnbondStatus || (UnbondStatus = {}));
export var ConnectStatus;
(function (ConnectStatus) {
    ConnectStatus["connected"] = "connected";
    ConnectStatus["disconnected"] = "disconnected";
})(ConnectStatus || (ConnectStatus = {}));
export var DisconnectStatus;
(function (DisconnectStatus) {
    DisconnectStatus["disconnected"] = "disconnected";
})(DisconnectStatus || (DisconnectStatus = {}));
export var CloseStatus;
(function (CloseStatus) {
    CloseStatus["closed"] = "closed";
})(CloseStatus || (CloseStatus = {}));
export var ServiceStatus;
(function (ServiceStatus) {
    ServiceStatus["services"] = "services";
})(ServiceStatus || (ServiceStatus = {}));
export var CharacteristicsStatus;
(function (CharacteristicsStatus) {
    CharacteristicsStatus["characteristics"] = "characteristics";
})(CharacteristicsStatus || (CharacteristicsStatus = {}));
export var DescriptorsStatus;
(function (DescriptorsStatus) {
    DescriptorsStatus["descriptors"] = "descriptors";
})(DescriptorsStatus || (DescriptorsStatus = {}));
export var ReadStatus;
(function (ReadStatus) {
    ReadStatus["read"] = "read";
})(ReadStatus || (ReadStatus = {}));
export var SubscribeStatus;
(function (SubscribeStatus) {
    SubscribeStatus["subscribed"] = "subscribed";
    SubscribeStatus["result"] = "subscribedResult";
})(SubscribeStatus || (SubscribeStatus = {}));
export var UnsubscribeStatus;
(function (UnsubscribeStatus) {
    UnsubscribeStatus["unsubscribed"] = "unsubscribed";
})(UnsubscribeStatus || (UnsubscribeStatus = {}));
export var WriteStatus;
(function (WriteStatus) {
    WriteStatus["written"] = "written";
})(WriteStatus || (WriteStatus = {}));
//# sourceMappingURL=BlePluginParams.js.map