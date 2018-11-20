const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
const FakeJsonData = require('./data.json');

class FakeDb {
    constructor() {
        this.rentals = FakeJsonData.rentals;
        this.user = FakeJsonData.users;
    }

    async cleanDB() {
        await User.deleteMany();
        await Rental.deleteMany();
        await Booking.deleteMany();
    }
    
    pushRentalsToDb() {

        // create new user with given property
        const user = new User(this.user[0]);
        const user2 = new User(this.user[1]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            // every rental user property we assign this user
            newRental.user = user;
            // that user has rentals array where we are pushing every rental since he/she is the owner
            user.rentals.push(newRental);
            // saving rental
            newRental.save();
        });

        // saving user at the end
        user.save();
        user2.save();
    }
    async seedDb() {
        await this.cleanDB();
        await this.pushRentalsToDb();
    }
}

module.exports = FakeDb; 