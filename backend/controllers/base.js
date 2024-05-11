
exports.unauthorized = Office => async (req, res, next) => {
	console.log(req.ip);
	let i = req.ip.lastIndexOf('.');
	let reqIp = req.ip.substring(0, i) + '.*';
	let data;
	try {
		data = await Office.findOne({ 'ip': reqIp }, 'ip numb adress');
		if (data === null) data = { ip: req.ip };
	} catch (error) { next(error); }
	res.status(200).send(data);
};

exports.insertdatasamples = async (Office,Message,Tag,Ticket,User) => {
	try {
    const o = await Office.find({});
    console.log('o:\n', o);

    await Office.insertMany([{
      "ip": "10.4.1.*",
      "numb": "0001",
      "adress": "Космонавтов пр.",
      "adressFull": "Космонавтов пр., д. 11, лит. А.,гипермаркет «0-key»",
      "fileList": [
      ],
      "tags": [
      ],
      "comments": [
        {

        }
      ],
      "users": [
      ],
      "links": [
        {
        }
      ],
      "hardware": {},
      "imgs": [
      ]
    }, {
      "ip": "10.4.2.*",
      "numb": "0002",
      "adress": "Авиаторов Балтики пр.",
      "adressFull": "Авиаторов Балтики пр., д. 21, лит. А.",
      "fileList": [
      ],
      "tags": [
      ],
      "comments": [
        {

        }
      ],
      "users": [
      ],
      "links": [
        {
        }
      ],
      "hardware": {},
      "imgs": [
      ]
    }
    ]
    )

    const O = await Office.find({});
    console.log('O:\n', O);


  } catch (err) {
    console.log(err);
  }


}

