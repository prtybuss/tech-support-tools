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
		"soundDir": "/user1"
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
			"edited": NumberLong("1693669157545")
		},
		"soundDir": "/user2"
	},
	{
		"_id": ObjectId("66661b8ab43c318e08168386"),
		"login": "user3",
		"role": "user",
		"password": "$2b$08$FlF.rysRoz6Qrms5MU3sPO5rC5qmEu3dEaNaDMUHdWcURA.7QN2rW",
		"office": ObjectId("64d460b105628cc22732442f"),
		"created": NumberLong("1693642482584"),
		"hardware": {
			"info": "some info about user's hw",
			"edited": NumberLong("1693669157545")
		},
		"soundDir": "/user3"

	}
]);

db.offices.insertMany([
	{
		"_id": ObjectId("64d460b105628cc22732442e"),
		"ip": "192.168.0.61",
		"numb": "0001",
		"adress": "Космонавтов пр.",
		"adressFull": "Космонавтов пр., д. 11, лит. А.,гипермаркет «0-key»",
		"fileList": [
		],
		"tags": ["651c725ee02dcd81c9259147", "651c7d00086850d84720fb6f", "651c7fc9de75a6883041f0af", "65e36ebbfd09b6f0965a10ec"
		],
		"comments": [
			{
				"text": "comment example",
				"author": ObjectId("64eb603b4282310b24942976"),
				"created": ISODate("2024-03-25T20:38:11.617Z")
			},
			{
				"text": "comment example",
				"author": ObjectId("64eb603b4282310b24942976"),
				"created": ISODate("2024-03-25T20:38:11.617Z")
			}
		],
		"users": ["64eb603b4282310b24942976", "64f2eef25b3db9b3613edd6d"],
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
		"ip": "192.168.0.62",
		"numb": "0002",
		"adress": "Авиаконструкторов",
		"adressFull": "Авиаконструкторов пр., д. 21, лит. Ш.",
		"fileList": [
		],
		"tags": ["651c725ee02dcd81c9259147", "651c7d00086850d84720fb6f", "651c7fc9de75a6883041f0af"
		],
		"comments": [
		],
		"users": ["66661b8ab43c318e08168386"],
		"links": [
		],
		"hardware": {
			"edited": "",
			"info": ""
		},
		"imgs": [
		]
	}
	, {
		"ip": "192.168.0.63",
		"numb": "0003",
		"adress": "Приморское ш.",
		"adressFull": "Приморское ш., д. 66, лит. Г.",
		"fileList": [
		],
		"tags": [],
		"comments": [
		],
		"users": [
		],
		"links": [
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
		"name": "tag1",
		"offices": ["64d460b105628cc22732442e", "64d460b105628cc22732442f"]
	},
	{
		"_id": ObjectId("651c7d00086850d84720fb6f"),
		"name": "tag2",
		"offices": ["64d460b105628cc22732442e", "64d460b105628cc22732442f"]
	},
	{
		"_id": ObjectId("651c7fc9de75a6883041f0af"),
		"name": "tag3",
		"offices": ["64d460b105628cc22732442e", "64d460b105628cc22732442f"]
	},
	{
		"_id": ObjectId("65e36ebbfd09b6f0965a10ec"),
		"name": "tag4",
		"offices": ["64d460b105628cc22732442e"]
	},
	{
		"name": "tag5",
		"offices": []
	},
])

db.tickets.insertMany([
	{
		"_id": ObjectId("64f8ff4066b2c39250dc9e98"),
		"theme": "sample ticket 1",
		"participants": [ObjectId("64f2eef25b3db9b3613edd6d")],
		"author": ObjectId("64f2eef25b3db9b3613edd6d"),
		"authorName": "author1",
		"office": ObjectId("64d460b105628cc22732442e"),
		"status": "proceed",
		"messages": [ObjectId("64f357250b101e85c1c6a95e"), ObjectId("64f37d290b101e85c1c6aae8")],
		"created": ISODate("2023-09-06T22:37:52.496Z"),
		"updated": ISODate("2024-03-02T19:04:23.852Z"),

	},
	{
		"_id": ObjectId("651dd3b4efc549cad22c9b5e"),
		"theme": "sample ticket 2",
		"participants": [ObjectId("64eb603b4282310b24942976")],
		"author": ObjectId("64eb603b4282310b24942976"),
		"authorName": "author2",
		"office": ObjectId("64d460b105628cc22732442f"),
		"status": "closed",
		"messages": [],
		"created": ISODate("2023-09-06T22:37:52.496Z"),
		"updated": ISODate("2024-03-02T19:04:23.852Z"),

	},
	{
		"_id": ObjectId("6520b2bb2932ad2ea811c0ca"),
		"theme": "sample ticket 3",
		"participants": [ObjectId("64f2eef25b3db9b3613edd6d")],
		"author": ObjectId("64f2eef25b3db9b3613edd6d"),
		"authorName": "author1",
		"office": ObjectId("64d460b105628cc22732442e"),
		"status": "new",
		"messages": [],
		"created": ISODate("2023-09-06T22:37:52.496Z"),
		"updated": ISODate("2024-03-02T19:04:23.852Z"),

	},
])

db.messages.insertMany([
	{
		"_id": ObjectId("64f357250b101e85c1c6a95e"),
		"text": "sample text memssage 1",
		"author": ObjectId("64f2eef25b3db9b3613edd6d"),
		"ticket": ObjectId("64f8ff4066b2c39250dc9e98"),
		"status": "viewed",
		"created": ISODate("2023-09-02T15:39:17.545Z"),
		"edited": ISODate("2023-09-02T15:39:17.545Z")
	},
	{
		"_id": ObjectId("64f37d290b101e85c1c6aae8"),
		"text": "sample text memssage 2",
		"author": ObjectId("64eb603b4282310b24942976"),
		"ticket": ObjectId("64f8ff4066b2c39250dc9e98"),
		"status": "viewed",
		"created": ISODate("2013-09-02T15:39:17.545Z"),
		"edited": ISODate("2014-09-02T15:39:17.545Z")
	},
	{
		"_id": ObjectId("64f37d590b101e85c1c6ab15"),
		"text": "sample text memssage 3",
		"author": ObjectId("64eb603b4282310b24942976"),
		"ticket": ObjectId("651dd3b4efc549cad22c9b5e"),
		"status": "viewed",
		"created": ISODate("2003-10-02T15:39:17.545Z"),
		"edited": ISODate("2004-09-02T15:39:17.545Z")
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