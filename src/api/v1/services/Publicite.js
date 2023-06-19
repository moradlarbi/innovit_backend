import { PrismaClient } from "@prisma/client"
import { getAnnonceurById } from './Annonceur.js';

const prisma = new PrismaClient();


export const getPublicites = async (req, res) => {
    try {
      const response = await prisma.publicite.findMany();
  
      const transformedVideos = await Promise.all(
        response.map(async (video) => {
          const [categorie, categRecette, annonceur] = await Promise.all([
            prisma.categorie.findUnique({ where: { id: video.idCategorie } }),
            prisma.categoryrecette.findUnique({
              where: { id: video.idCategRecette },
            }),
            prisma.annonceur.findUnique({ where: { id: video.idAnnonceur } }),
          ]);
          return {
            id:video.id,
            url: video.url,
            categorie: video.idCategorie, 
            categRecette: video.idCategRecette,
            annonceur: annonceur?.nom+" "+annonceur?.prenom,
          };
        })
      );
  
      console.log(transformedVideos);
      res.status(200).json(transformedVideos); // Send transformedVideos instead of response
  
    } catch (error) {
      res.status(500).json({ msg: error.message }); // Use error.message instead of error.msg
    }
  };
  
  

export const getPubliciteById = async (req , res)=>{
    try {
        const response = await prisma.publicite.findUnique({
            where:{
                id : Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : msg.error});
    }
}

export const createPublicite = async (req, res) => {
    try{
        const {idCategorie, idCategRecette, idAnnonceur ,url} = req.body;
            console.log(req.body);
            const publicite = await prisma.publicite.create({
                data: {
                    url: url,
                    idCategorie: Number(idCategorie),
                    idCategRecette: Number(idCategRecette),
                    idAnnonceur: Number(idAnnonceur)
                }
            });
            res.status(201).json(publicite);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while uploading the video.');
    }
}


export const updatePublicite = async (req , res)=>{
    const {categorie , categRecette, url } = req.body;
    try {
        const publicite = await prisma.publicite.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                idCategorie: Number(categorie),
                idCategRecette: Number(categRecette),
                url: url
            }
        });
        res.status(201).json(publicite);
    } catch (error) {
        res.status(400).json({msg : error.msg});
    }
}


export const deletePublicite = async (req, res) => {
    try {
      const publicite = await prisma.publicite.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
  
      if (!publicite) {
        res.status(404).send("Publicité not found");
        return;
      }
  
    
  
      await prisma.publicite.delete({
        where: {
          id: Number(req.params.id),
        },
      });
  
      res.status(200).send("Publicité deleted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while deleting the publicité");
    }
  };