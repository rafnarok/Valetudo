const fs = require("fs");
const should = require("should");

const LinuxWifiScanCapability = require("../../../../../lib/robots/common/linuxCapabilities/LinuxWifiScanCapability");

should.config.checkProtoEql = false;

describe("LinuxWifiScanCapability", function () {
    let capability;
    beforeEach(function () {
        capability = new LinuxWifiScanCapability({robot: undefined});
    });

    it("Should parse iw scan output correctly", async function() {
        let data = fs.readFileSync("./test/lib/robots/common/linuxCapabilities/res/iw_3.4_scan.txt").toString();
        let expected = JSON.parse(fs.readFileSync("./test/lib/robots/common/linuxCapabilities/res/iw_3.4_scan.json").toString());

        let actual = capability.parseScanData(data);

        actual.should.deepEqual(expected);
    });

});
