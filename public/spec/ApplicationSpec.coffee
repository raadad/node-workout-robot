describe "General Site Tests" , ->
	it "Gets Data From Server" , ->
		expect(_test.data.length > 0 )
	it "Renders Correctly" , ->
		_test.appRender()


describe "Model Generation Tests" , ->
	it "Generate With Default Values" , ->
		_test.generateModel 10 , 3

	it "Wont Generate With No Args" , ->
		try
			_test.generateModel()
			throw new Error("This Should not work")
		catch error
			console.log error

	it "Wont Generate With Bad Args" , ->
		try
			_test.generateModel("lol","mad")
			throw new Error("This Should not work")
		catch error
			console.log error	
	it "Wont Generate With Out Of Range Args" , ->
		try
			_test.generateModel(-1, -1)
			throw new Error("This Should not work")
		catch error
			console.log error

describe "Model Calculation Tests" , ->
	it "It Can Convert Minutes to Seconds" , ->
		#10 minutes should be 600 seconds
		model = _test.generateModel(10,3)
		expect(model.originalTime).toEqual(600)
	it "It Calculates Proper Set Length" , ->
		# A ten minute session and high intensity (value 2)
		# Should create 150 minute sets
		model = _test.generateModel(10,2)
		expect(model.setLength).toEqual(150)		

	


