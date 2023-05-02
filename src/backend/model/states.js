const states = [
    {
        "code": "AP",
        "name": "Andhra Pradesh",
        "cities": [
            "Visakhapatnam",
            "Vijayawada",
            "Guntur",
            "Nellore",
            "Kurnool",
            "Kadapa",
            "Rajahmundry"
        ]
    },
    {
        "code": "AR",
        "name": "Arunachal Pradesh",
        "cities": [
            "Itanagar",
            "Tawang",
            "Ziro",
            "Bomdila",
            "Pasighat"
        ]
    },
    {
        "code": "AS",
        "name": "Assam",
        "cities": [
            "Guwahati",
            "Jorhat",
            "Silchar",
            "Dibrugarh",
            "Tezpur"
        ]
    },
    {
        "code": "BR",
        "name": "Bihar",
        "cities": [
            "Patna",
            "Gaya",
            "Bhagalpur",
            "Muzaffarpur",
            "Purnia",
            "Darbhanga"
        ]
    },
    {
        "code": "CG",
        "name": "Chhattisgarh",
        "cities": [
            "Raipur",
            "Bhilai",
            "Bilaspur",
            "Korba",
            "Durg"
        ]
    },
    {
        "code": "GA",
        "name": "Goa",
        "cities": [
            "Panaji",
            "Margao",
            "Vasco da Gama",
            "Mapusa",
            "Ponda"
        ]
    },
    {
        "code": "GJ",
        "name": "Gujarat",
        "cities": [
            "Ahmedabad",
            "Surat",
            "Vadodara",
            "Rajkot",
            "Bhavnagar",
            "Jamnagar"
        ]
    },
    {
        "code": "HR",
        "name": "Haryana",
        "cities": [
            "Chandigarh",
            "Faridabad",
            "Gurgaon",
            "Hisar",
            "Karnal",
            "Panipat"
        ]
    },
    {
        "code": "HP",
        "name": "Himachal Pradesh",
        "cities": [
            "Shimla",
            "Manali",
            "Dharamsala",
            "Kullu",
            "Mandi"
        ]
    },
    {
        "code": "JK",
        "name": "Jammu and Kashmir",
        "cities": [
            "Srinagar",
            "Jammu",
            "Anantnag",
            "Baramulla",
            "Kathua"
        ]
    },
    {
        "code": "JH",
        "name": "Jharkhand",
        "cities": [
            "Ranchi",
            "Jamshedpur",
            "Dhanbad",
            "Bokaro",
            "Hazaribagh"
        ]
    },
    {
        "code": "KA",
        "name": "Karnataka",
        "cities": [
            "Bengaluru",
            "Mysuru",
            "Hubli-Dharwad",
            "Mangalore",
            "Belagavi",
            "Shivamogga"
        ]
    },
    {
        "code": "KL",
        "name": "Kerala",
        "cities": [
            "Thiruvananthapuram",
            "Kochi",
            "Kozhikode",
            "Thrissur",
            "Kollam",
            "Palakkad"
        ]
    },
    {
        "code": "MP",
        "name": "Madhya Pradesh",
        "cities": [
            "Indore",
            "Bhopal",
            "Jabalpur",
            "Gwalior",
            "Ujjain",
            "Sagar"
        ]
    },
    {
        "code": "MH",
        "name": "Maharashtra",
        "cities": [
            "Mumbai",
            "Pune",
            "Nagpur",
            "Thane",
            "Nashik",
            "Aurangabad"
        ]
    },
    {
        "code": "MN",
        "name": "Manipur",
        "cities": [
            "Imphal",
            "Thoubal",
            "Bishnupur",
            "Churachandpur",
            "Senapati"
        ]
    },
    {
        "code": "ML",
        "name": "Meghalaya",
        "cities": [
            "Shillong",
            "Tura",
            "Jowai",
            "Nongstoin",
            "Baghmara"
        ]
    },
    {
        "code": "MZ",
        "name": "Mizoram",
        "cities": [
            "Aizawl",
            "Lunglei",
            "Saiha",
            "Champhai",
            "Serchhip"
        ]
    },
    {
        "code": "NL",
        "name": "Nagaland",
        "cities": [
            "Kohima",
            "Dimapur",
            "Mokokchung",
            "Tuensang",
            "Wokha"
        ]
    },
    {
        "code": "OD",
        "name": "Odisha",
        "cities": [
            "Bhubaneswar",
            "Cuttack",
            "Rourkela",
            "Sambalpur",
            "Berhampur",
            "Puri"
        ]
    },
    {
        "code": "PB",
        "name": "Punjab",
        "cities": [
            "Chandigarh",
            "Ludhiana",
            "Amritsar",
            "Jalandhar",
            "Patiala",
            "Bathinda"
        ]
    },
    {
        "code": "RJ",
        "name": "Rajasthan",
        "cities": [
            "Jaipur",
            "Jodhpur",
            "Udaipur",
            "Ajmer",
            "Kota",
            "Bikaner"
        ]
    },
    {
        "code": "SK",
        "name": "Sikkim",
        "cities": [
            "Gangtok",
            "Namchi",
            "Gyalshing",
            "Ravangla",
            "Singtam"
        ]
    },
    {
        "code": "TN",
        "name": "Tamil Nadu",
        "cities": [
            "Chennai",
            "Coimbatore",
            "Madurai",
            "Tiruchirappalli",
            "Salem",
            "Tirunelveli"
        ]
    },
    {
        "code": "TS",
        "name": "Telangana",
        "cities": [
            "Hyderabad",
            "Warangal",
            "Nizamabad",
            "Karimnagar",
            "Khammam",
            "Ramagundam"
        ]
    },
    {
        "code": "TR",
        "name": "Tripura",
        "cities": [
            "Agartala",
            "Udaipur",
            "Dharmanagar",
            "Kailashahar",
            "Belonia"
        ]
    },
    {
        "code": "UK",
        "name": "Uttarakhand",
        "cities": [
            "Dehradun",
            "Haridwar",
            "Nainital",
            "Rishikesh",
            "Mussoorie",
            "Haldwani"
        ]
    },
    {
        "code": "UP",
        "name": "Uttar Pradesh",
        "cities": [
            "Lucknow",
            "Kanpur",
            "Ghaziabad",
            "Agra",
            "Varanasi",
            "Prayagraj"
        ]
    },
    {
        "code": "WB",
        "name": "West Bengal",
        "cities": [
            "Kolkata",
            "Darjeeling",
            "Asansol",
            "Siliguri",
            "Durgapur",
            "Kharagpur"
        ]
    }
];

export default states;