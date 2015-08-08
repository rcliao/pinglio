module.exports = Website;

function Website (name, address) {
    this.name = name;
    this.address = address;
    this.timeout = 1000; // default timeout to be 1 second
}
