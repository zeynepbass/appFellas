import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/kullanici.js'


const signin=async (req,res)=>{

    const {email,password}=req.body;

    try {

        const isim=await User.findOne({email})
    
        
        if(!isim) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

        const kullanici=await User.findOne({email})
    
        
        if(!kullanici) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

        const parolaKontrolSonuc=await bcrypt.compare(password,kullanici.password);

        if(!parolaKontrolSonuc) return res.status(400).json({message:'Parolayı doğru giriniz'})

        const token=jwt.sign({email:kullanici.email,id:kullanici._id},'aos-secret-code',{expiresIn:'30d'})

        res.status(200).json({result:kullanici,token})

    } catch (error) {

        res.status(500).json({message:'Bir hata oluştu'})
        
    }
}


const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const kullanici = await User.findOne({ email });

        if (kullanici) return res.status(400).json({ message: 'Kullanıcı Zaten Bulunuyor' });

        if (password !== confirmPassword) return res.status(400).json({ message: 'Parolalar uyuşmadı!' });

        const sifrelenmisParola = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: sifrelenmisParola,
            firstName,
            lastName,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, 'aos-secret-key', { expiresIn: '30d' });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
};
export { signin, signup};