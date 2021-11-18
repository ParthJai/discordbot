const mongoose = require('mongoose');

const compSchema = mongoose.Schema ({
	//_id: mongoose.Schema.Types.ObjectId,
	strat: String,
	image: String,
	th: String,
	user: String,
	cc: String,
	clashurl: String
});

module.exports = mongoose.model("Comp",compSchema);