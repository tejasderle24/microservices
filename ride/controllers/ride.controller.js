export const createRide = (req, res) => {
    const { pickup, destination } = req.body;

    // Create a new ride
    const newRide = new Ride({
        user: req.user._id,
        pickup,
        destination
    });

   
};

