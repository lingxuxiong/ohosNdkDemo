const dgram = require('dgram');

// Function to convert a number to a byte array
function intToByteArray(num) {
    return [(num >> 24) & 0xFF, (num >> 16) & 0xFF, (num >> 8) & 0xFF, num & 0xFF];
}

// Function to create an SNMP packet
function createSnmpPacket() {
    const version = 0; // SNMP version 1
    const community = 'public'; // Community string
    const requestId = Math.floor(Math.random() * 65536); // Random request ID
    const errorStatus = 0; // No error
    const errorIndex = 0; // No error index

    // OIDs to include
    const oids = [
        '1.3.6.1.2.1.25.3.2.1.3.1', // Device Name OID
        '1.3.6.1.2.1.43.5.1.1.17.1' // Device SN OID
    ];

    // Build the SNMP packet
    const packet = [];

    // SNMP version
    packet.push(0x30); // Sequence
    packet.push(0); // Placeholder for length
    packet.push(0x02, 0x01, version); // Version

    // Community string
    const communityBytes = Buffer.from(community, 'utf8');
    packet.push(0x04, communityBytes.length);
    packet.push(...communityBytes);

    // PDU
    packet.push(0xA0); // GetRequest PDU
    packet.push(0); // Placeholder for length
    packet.push(...intToByteArray(requestId)); // Request ID
    packet.push(0x02, 0x01, errorStatus); // Error status
    packet.push(0x02, 0x01, errorIndex); // Error index

    // Variable bindings
    packet.push(0x30); // Sequence for variable bindings
    packet.push(0); // Placeholder for length

    // Add OIDs to the packet
    for (const oid of oids) {
        const oidParts = oid.split('.').map(Number);
        const oidLength = oidParts.length;

        // OID encoding
        const encodedOid = [0x06]; // OID type
        encodedOid.push(oidLength); // OID length
        encodedOid.push(...oidParts); // OID parts

        // Add the OID to the variable bindings
        packet.push(0x30); // Sequence for each variable binding
        packet.push(0); // Placeholder for length
        packet.push(...encodedOid); // OID
        packet.push(0x05, 0x00); // Null value (for simplicity)
    }

    // Calculate lengths and update placeholders
    const totalLength = packet.length - 2; // Exclude the first length byte
    packet[1] = totalLength; // Update the length of the SNMP packet

    // Send the packet
    const client = dgram.createSocket('udp4');
    const targetAddress = '192.168.108.255'; // Broadcast address
    const targetPort = 9998; // SNMP port

    client.send(Buffer.from(packet), targetPort, targetAddress, (err) => {
        if (err) {
            console.error('Error sending packet:', err);
        } else {
            console.log('SNMP packet sent successfully');
        }
        client.close();
    });
}

// Create and send the SNMP packet
createSnmpPacket();

