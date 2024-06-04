const adminModel = require("../../models/admin");

const deleteAdmin = async (request, response) => {
  const { id } = request.params;
  //find admin
  console.log(id);
  const admin = await adminModel.findOne({ _id: id });
  console.log(admin);
  if (admin) {
    console.log("EXist");
    //if admin exist
    await adminModel.deleteOne({ _id: id });
    //response
    return response.json({
      status: "Succes",
      message: "Admin Delted Succefully",
    });
  } else {
    console.log(" NOYEXist");
    //if admin not exist
    return response.json({
      status: "Error",
      message: `No admin With the same ID ('${id}')`,
    });
  }
};
module.exports = deleteAdmin;
