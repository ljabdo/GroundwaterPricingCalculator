// server/index.js
const express = require("express");
var cors = require('cors')

const PORT = process.env.PORT || 3001;

const weights = {
    time: 5,
    season: 5,
    soil: 5,
    acre: 20,
    gw: 12,
    gw2: 40,
    vine: 13.5,
    irrigation: 11.5
}

const formCalcs = {

}

const app = express();
app.use(cors())
app.use(express.json())

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/api", (req, res) => {
    console.log("post received");
    let data = req.body;
    console.log(req.body);
    // res.json({message: "test"});
    let acreNum = 0;

    //Form calculations
    try{
        let timeCoef = data.time / weights.time;
        let seasonCoef = data.season / weights.season;

        //IFS(B4>3,3,B4>2,5,B4>1,7,B4>0,9
        data.soil = parseInt(data.soil)
        if (data.soil > 3)
            data.soil = 3
        else if (data.soil > 2)
            data.soil = 5
        else if (data.soil > 1)
            data.soil = 7
        else if (data.soil > 0)
            data.soil = 9
        let soilCoef = data.soil / weights.soil;
        let evapo = data.evapo;
        let rainfall = data.rainfall;

        data.acreage = parseInt(data.acreage)
        if (data.acreage > 500)
            acreNum = 45
        else if (data.acreage > 300)
            acreNum = 35
        else if (data.acreage > 150)
            acreNum = 32
        else if (data.acreage > 100)
            acreNum = 30
        else if (data.acreage > 75)
            acreNum = 25
        else if (data.acreage > 50)
            acreNum = 20
        else if (data.acreage > 30)
            acreNum = 18
        else if (data.acreage > 20)
            acreNum = 15
        else if (data.acreage > 0)
            acreNum = 10

        let acreCoef = acreNum / weights.acre;

        //(B7>500,45,B7>300,35,B7>150,32,B7>100,30,B7>75,25,B7>50,20,B7>30,18,B7>20,15,B7>0,10)/20)
        //B8>100,80,B8>14,70,B8>5,40,B8>0,20
        let gwConsumption = ((evapo - rainfall) / weights.gw) * (data.acreage);
        if (gwConsumption > 100)
            gwCoef = 80
        else if (gwConsumption > 14)
            gwCoef = 70
        else if (gwConsumption > 5)
            gwCoef = 40
        else if (gwConsumption > 0)
            gwCoef = 20

        gwCoef = gwCoef / weights.gw2;

        let vineCoef = data.vine / weights.vine;
        let irrigationCoef = data.irrigation / weights.irrigation;

        console.log(timeCoef);
        console.log(seasonCoef);
        console.log(soilCoef);
        console.log(acreCoef);
        console.log(gwCoef);
        console.log(vineCoef);
        console.log(irrigationCoef);

        let totalCoef = timeCoef + seasonCoef + soilCoef + acreCoef + gwCoef + vineCoef + irrigationCoef;
        totalCoef = totalCoef / 7
        console.log("total coef " + totalCoef);

        let flatFee = 20;
        let defaultPrices = [130, 160, 205, 280, 400];
        let adjustedPrices = [130 * totalCoef, 160 * totalCoef, 205 * totalCoef, 280 * totalCoef, 400 * totalCoef];
        let usages = [0.01, 3.00, 8.00, 14.00, 50.00];
        let priceIncreases = [0, (adjustedPrices[1] - adjustedPrices[0]) / adjustedPrices[0],
                            (adjustedPrices[2] - adjustedPrices[1]) / adjustedPrices[1],
                            (adjustedPrices[3] - adjustedPrices[2]) / adjustedPrices[2],
                            (adjustedPrices[4] - adjustedPrices[3]) / adjustedPrices[3]];
        let tableIndex = closestIndex(gwConsumption, usages);
        let waterPriceAcre = usages[tableIndex] * priceIncreases[tableIndex] + adjustedPrices[tableIndex]
        let waterCostAcre = waterPriceAcre * gwConsumption / data.acreage + flatFee
        let totalWaterCost = data.acreage * waterCostAcre;



        console.log(defaultPrices);
        console.log(adjustedPrices);
        console.log(priceIncreases);
        console.log(gwConsumption);
        console.log(waterPriceAcre);
        console.log(waterCostAcre);
        console.log(totalWaterCost)
        res.send(
            JSON.stringify({adjustedPrices, waterPriceAcre})
        );

        console.log("Calculated... \n");
    }
    catch(error){
        console.error(error)
    }

    function closestIndex(num, arr){
        let curr = arr[0], diff = Math.abs(num - curr);
        let index = 0;
        for (let val = 0; val < arr.length; val++) {
            let newdiff = Math.abs(num - arr[val]);
            if (newdiff < diff) {
                diff = newdiff;
                curr = arr[val];
                index = val;
            };
        };
        return index;
    };

    // res.send('Data Received: ' + JSON.stringify(data));
})
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});