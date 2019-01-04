export const openProject = dialog =>
    new Promise((resolve, reject) => {
        dialog.showOpenDialog(
            {
                properties: ['openDirectory']
            },
            directories => {
                if (directories) {
                    resolve(directories[0]);
                }
                reject();
            }
        );
    });

export default openProject;
