import Singleton from './Singleton';

const a = Singleton.getInstance();//para obtener una instancia tenemos que hacer getInstance ya que el constructor es privado y solo getInstance es publico
const b = Singleton.getInstance();

//vamos a demostrar que Singleton solo exporta una instancia por lo que a y b tienen que ser iguales

console.log('a y b son iguales', a===b);

//se cumplio que a y b son iguales porque devolvio true