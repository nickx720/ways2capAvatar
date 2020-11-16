const localFileOp = require('./localFileOp');

const setUpMockDb = () => {
    let data;
    return localFileOp.readFromLocal
        .then((value) => {
            data = JSON.parse(value.toString('utf-8'));
            return data;
        })
        .catch((err) => {
            data = err;
            return data;
        });
};

const getAllUsers = async (req, res) => {
    const data = await setUpMockDb();
    if (data instanceof Error) {
        return res.status(500).send('File not found');
    }
    return res.status(200).json(data);
};

const getUserById = async (req, res) => {
    const data = await setUpMockDb();
    const { id } = req.params;
    if (data instanceof Error) {
        return res.status(500).send('File not found');
    }
    const output = data.filter((x) => x.id === Number(id));
    return res.status(200).send(output);
};

const uploadByUserId = async (req, res) => {
    const data = await setUpMockDb();
    const { id } = req.params;
    const { name, email } = req.body;
    const { path } = req.file;
    const [_, ...newPath] = path.split('/');
    const checkIfIdExists = data.findIndex((x) => x.id === Number(id));
    if (checkIfIdExists !== -1) {
        data[checkIfIdExists].avatar = `http://localhost:4000/${newPath.join(
            '/'
        )}`;
        data[checkIfIdExists].name = name;
        data[checkIfIdExists].email = email;
        await localFileOp.writeFile(localFileOp.dataPath, JSON.stringify(data));
        return res.status(200).send('Avatar Updated');
    }
    return res.status(404).send('No such avatar');
};

module.exports = {
    getAllUsers,
    getUserById,
    uploadByUserId,
};
