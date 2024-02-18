export const validateFiles = (req, res, next) => {
    if (req.files) {
        if(req.files.images){
            req.files.images.forEach((file) => {
                if (!file.mimetype.startsWith("image/")) {
                    return res.status(400).json({ error: "Only images are allowed" });
                }
            });
        }
        if(req.files.image){
            if(!req.files.image.mimetype.startsWith("image/")){
                return res.status(400).json({ error: "Only images are allowed" });
            }
        }
  	}
	next();
};
