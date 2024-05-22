db.users.insertMany([
	{
		"login": "test",
		"role": "admin",
		"password": "$2b$08$rmKsitFkRRaHLyA4c5O.seXfgHjazZ.c8CYFt85mu6B3xzgvcE8cW",
		"created": NumberLong("1692738426776")
	},
	{
		"_id": ObjectId("64eb603b4282310b24942976"),
		"login": "user1",
		"role": "user",
		"password": "$2b$08$vjd5Uy6BKFgkfv1G790ijeChRqcLqlx9CJlT4gXxIHx.Ai2qMIzGm",
		"office": ObjectId("64d460b105628cc22732442e"),
		"created": NumberLong("1693147195213"),
		"hardware": {
			"info": "Lenovo b590 laptop: Celeron 1005M, 2x1.9 ГГц, RAM 2 ГБ, HDD 320 ГБ",
			"edited": NumberLong("1693669157545")
		}
		,
		"soundDir": "arch-1"
	},
	{
		"_id": ObjectId("64f2eef25b3db9b3613edd6d"),
		"login": "user2",
		"role": "user",
		"password": "$2b$08$D1B.xhy17Z.h4AvwmKbi4.P1WpdQlTsTBZhWlreLz.uwShMelrLHS",
		"office": ObjectId("64d460b105628cc22732442e"),
		"created": NumberLong("1693642482584"),
		"hardware": {
			"info": "sample text here",
			"edited": NumberLong("1693669157545"),
			"soundDir": "arch-1"
		}
	}
]);

db.offices.insertMany([
	{
		"_id": ObjectId("64d460b105628cc22732442e"),
		"ip": "10.4.1.*",
		"numb": "0001",
		"adress": "Космонавтов пр.",
		"adressFull": "Космонавтов пр., д. 11, лит. А.,гипермаркет «0-key»",
		"fileList": [
		],
		"tags": [ "651c725ee02dcd81c9259147","651c7d00086850d84720fb6f","651c7fc9de75a6883041f0af","65e36ebbfd09b6f0965a10ec"
		],
		"comments": [
			{
				"text": "comment example",
				"author":  ObjectId("64eb603b4282310b24942976"),
				"created": ISODate("2024-03-25T20:38:11.617Z")
			}
		],
		"users": ["64eb603b4282310b24942976","64f2eef25b3db9b3613edd6d"],
		"links": [
			{
				"title": "link",
				"url": "www.test.com",
				"_id": "65fb03210dbd1519d1bd6fa8"
			}
		],
		"hardware": {
			"edited": ISODate("2024-03-25T20:38:11.617Z"),
			"info": "sample text example"
		},
		"imgs": [
		]
	}, {
		"_id": ObjectId("64d460b105628cc22732442f"),
		"ip": "10.4.2.*",
		"numb": "0002",
		"adress": "Авиаторов Балтики пр.",
		"adressFull": "Авиаторов Балтики пр., д. 21, лит. А.",
		"fileList": [
		],
		"tags": ["651c725ee02dcd81c9259147","651c7d00086850d84720fb6f","651c7fc9de75a6883041f0af"
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
		"hardware": {
			"edited": "",
			"info": ""
		},
		"imgs": [
		]
	}
])

db.tags.insertMany([
	{
		"_id": ObjectId("651c725ee02dcd81c9259147"),
		"name":"tag1",
		"offices":["64d460b105628cc22732442e","64d460b105628cc22732442f"]
	},
	{
		"_id": ObjectId("651c7d00086850d84720fb6f"),
		"name":"tag2",
		"offices":["64d460b105628cc22732442e","64d460b105628cc22732442f"]
	},
	{
		"_id": ObjectId("651c7fc9de75a6883041f0af"),
		"name":"tag3",
		"offices":["64d460b105628cc22732442e","64d460b105628cc22732442f"]
	},
	{
		"_id": ObjectId("65e36ebbfd09b6f0965a10ec"),
		"name":"tag4",
		"offices":["64d460b105628cc22732442e"]
	},
	{
		"name":"tag5",
		"offices":[]
	},
])

/* db.createUser(
	{
		user: "<user for database which shall be created>",
		pwd: "<password of user>",
		roles: [
			{
				role: "readWrite",
				db: "<database to create>"
			}
		]
	}
);
 */