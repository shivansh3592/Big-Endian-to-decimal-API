// EXPORT MODULE TO app.js
module.exports.endianTODecimal = (value)=>{
        let sendData = {};
    Object.keys(value).forEach(key => {

        // Check if there is any alphaber
        if (value[key].match(/[a-z]/i)) {
            // alphabet letters found
            sendData[key]="Not possible";
        }

        // Check if endian format is 4bit or 8 bit
        else if(value[key].split(':').length - 1<=3) {
            // Removes : and convert all string into integer and store it inti array
            let data = value[key].split(":").map(Number);
            // Create a buffer
            let buf = new ArrayBuffer(4);
            // Create a data view of it
            let view = new DataView(buf);

            // set bytes
            data.forEach(function (b, i) {
                view.setUint8(i, b);
            });

            // Read the bits as a float; note that by doing this, we're implicitly
            // converting it from a 32-bit float into JavaScript's native 64-bit double
            let num = view.getFloat32(0);
            // Done
            if(num<0.000001){num=0;}
            sendData[key]=num;


        }
            //          FOR 8bit endian number
        else{
            // Removes : and convert all string into integer and store it inti array
            let data = value[key].split(":").map(Number);
            let decimal = 0;
            for(let i=0;i<data.length;i++)
            {
                decimal = Math.pow(256,data.length-i-1)*data[i] + decimal ;
            }
             decimal = decimal/1000000;
            if(decimal<0.000000001){decimal=0;}
             sendData[key]= decimal ;

        }
    })
    return sendData ;
}