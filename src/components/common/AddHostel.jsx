import React from "react"

export default function AddHostel() {

    const [hostel, setHostel] = React.useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setHostel(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <div>
            {/* form to take input hostel field such as... */}
            {/*

    hostel_name: {
    type: String,
    required: true,
    },

    pricingAndSharing: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "PricingAndSharing",
        required: true
    },

    arrayOfImages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Image"
    },

    locality: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    forWhichGender: {
        type: String,
        enum: ["Boys", "Girls", "Both"],
        required: true
    },

    liftFacility: Boolean,
    wifiFacility: Boolean,
    gymFacility: Boolean,
    acFacility: Boolean,
    gamingRoom: Boolean,
    freeLaundry: Boolean,
    securityGuard: Boolean,
    filterWater: Boolean,
    cctv: Boolean,
    cleaning: Boolean,

    description: {
        type: String,
    },

    contactNum: String,

    contactMail: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailRegex.test(email);
            },

            message: "Invalid Email"
        },
    },

    address: String,

    nearestLandmarks: [String],
     */}
            <form>
                <input type="text" name="hostel_name" value={hostel.hostel_name} onChange={handleChange} />
                <input type="text" name="locality" value={hostel.locality} onChange={handleChange} />
                <input type="text" name="city" value={hostel.city} onChange={handleChange} />
                <input type="text" name="forWhichGender" value={hostel.forWhichGender} onChange={handleChange} />
                <input type="text" name="contactMail" value={hostel.contactMail} onChange={handleChange} />
                <input type="text" name="address" value={hostel.address} onChange={handleChange} />
                <input type="text" name="contactNum" value={hostel.contactNum} onChange={handleChange} />
                <input type="text" name="description" value={hostel.description} onChange={handleChange} />
                <input type="text" name="nearestLandmarks" value={hostel.nearestLandmarks} onChange={handleChange} />
                <input type="text" name="liftFacility" value={hostel.liftFacility} onChange={handleChange} />
                <input type="text" name="wifiFacility" value={hostel.wifiFacility} onChange={handleChange} />
                <input type="text" name="gymFacility" value={hostel.gymFacility} onChange={handleChange} />
                <input type="text" name="acFacility" value={hostel.acFacility} onChange={handleChange} />
                <input type="text" name="gamingRoom" value={hostel.gamingRoom} onChange={handleChange} />
                <input type="text" name="freeLaundry" value={hostel.freeLaundry} onChange={handleChange} />
                <input type="text" name="securityGuard" value={hostel.securityGuard} onChange={handleChange} />
                <input type="text" name="filterWater" value={hostel.filterWater} onChange={handleChange} />
                <input type="text" name="cctv" value={hostel.cctv} onChange={handleChange} />
                <input type="text" name="cleaning" value={hostel.cleaning} onChange={handleChange} />
                <input type="text" name="pricingAndSharing" value={hostel.pricingAndSharing} onChange={handleChange} />
                <input type="text" name="arrayOfImages" value={hostel.arrayOfImages} onChange={handleChange} />
            </form>
        </div>
    )
}