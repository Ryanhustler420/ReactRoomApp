const Rental = require('./models/rental');
const User = require('./models/user');

class FakeDb {
    constructor() {
        this.rentals = [
            {
                title: "Nice view on ocean",
                city: "San Francisco",
                street: "Main street",
                category: "condo",
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                bedrooms: 4,
                shared:true,
                description: "Very nice apartment in center of the city.",
                dailyRate: 43
            },
            {
                title: "Modern apartment in center",
                city: "New York",
                street: "Time Square",
                category: "apartment",
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                bedrooms: 1,
                shared:false,
                description: "Very nice apartment in center of the city.",
                dailyRate: 43
            },
            {
                title: "Old house in nature",
                city: "Spisska Nova Ves",
                street: "Banicka 1",
                category: "house",
                image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                bedrooms: 5,
                shared:true,
                description: "Very nice apartment in center of the city.",
                dailyRate: 23
            }
        ];
        this.user = [{
            username: 'Gaurav Gupta',
            email: 'gouravgupta840@gmail.com',
            password: '123456'
        },{
            username: 'Saurav Gupta',
            email: 'sauravgupta4000@gmail.com',
            password: '123456'
        }]
    }

    async cleanDB() {
        await User.deleteMany();
        await Rental.deleteMany();
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