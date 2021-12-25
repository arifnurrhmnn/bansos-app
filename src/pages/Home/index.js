import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";

export default function Home() {
  const [provinsi, setProvinsi] = useState([]);
  const [kotaKabupaten, setKotaKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  const [idProvinsi, setIdProvinsi] = useState();
  const [idKotaKabupaten, setIdKotaKabupaten] = useState();
  const [idKecamatan, setIdKecamatan] = useState();

  const [data, setData] = useState({
    nama: "",
    nik: "",
    noKK: "",
    fotoKTP: "",
    fotoKK: "",
    umur: "",
    jenisKelamin: "",
    provinsi: provinsi,
    kotaKabupaten: "",
    kecamatan: "",
    kelurahan: "",
    alamat: "",
    rt: "",
    rw: "",
    penghasilanSebelumPandemi: "",
    penghasilanSetelahPandemi: "",
    alasan: "",
    pernyataan: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((res) => {
        setProvinsi(res.data.provinsi);
      });
  }, []);

  // GET Kabupaten
  useEffect(() => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvinsi}`
      )
      .then((res) => {
        setKotaKabupaten(res.data.kota_kabupaten);
      });
  }, [idProvinsi]);

  // GET Kecamatan
  useEffect(() => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${idKotaKabupaten}`
      )
      .then((res) => {
        setKecamatan(res.data.kecamatan);
      });
  }, [idKotaKabupaten]);

  // GET Kelurahan
  useEffect(() => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKecamatan}`
      )
      .then((res) => {
        setKelurahan(res.data.kelurahan);
      });
  }, [idKecamatan]);

  return (
    <>
      <section className="container">
        <div className="box-result">
          <p>{data.nama}</p>
          <p>{data.nik}</p>
          <p>{data.noKK}</p>
          <p>{data.fotoKTP}</p>
          <p>{data.fotoKK}</p>
          <p>{data.umur}</p>
          <p>{data.jenisKelamin}</p>
          <p>{data.provinsi}</p>
          <p>{data.alamat}</p>
          <p>{data.rt}</p>
          <p>{data.rw}</p>
          <p>{data.penghasilanSebelumPandemi}</p>
          <p>{data.penghasilanSetelahPandemi}</p>
          <p>{data.alasan}</p>
          <p>{data.alasanLainnya}</p>
          <p>
            {data.pernyataan
              ? "Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut."
              : ""}
          </p>
        </div>
        <form className="form-Wrapper">
          <div className="row">
            <label htmlFor="">Nama</label>
            <input
              type="text"
              className=""
              placeholder="Jawaban Anda"
              value={data.nama}
              name="nama"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="">NIK</label>
            <input
              type="text"
              className=""
              placeholder="Jawaban Anda"
              value={data.nik}
              name="nik"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="">Nomor Kartu Keluarga</label>
            <input
              type="text"
              className=""
              placeholder="Jawaban Anda"
              value={data.noKK}
              name="noKK"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="">Foto KTP</label>
            <input
              type="file"
              className=""
              value={data.fotoKTP}
              name="fotoKTP"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="">Foto Kartu Keluarga</label>
            <input
              type="file"
              className=""
              value={data.fotoKK}
              name="fotoKK"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="">Umur</label>
            <input
              type="text"
              className=""
              placeholder="Jawaban Anda"
              value={data.umur}
              name="umur"
              onChange={handleChange}
            />
          </div>
          <div className="row ">
            <label htmlFor="">Jenis Kelamin</label>
            <div className="radio-option">
              <div className="radio-button">
                <input
                  type="radio"
                  name="jenisKelamin"
                  className="radio"
                  value="Laki-Laki"
                  checked={data.jenisKelamin === "Laki-Laki"}
                  onChange={handleChange}
                />
                Laki-Laki
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  name="jenisKelamin"
                  className="radio"
                  value="Perempuan"
                  checked={data.jenisKelamin === "Perempuan"}
                  onChange={handleChange}
                />
                Perempuan
              </div>
            </div>
          </div>
          <div className="row">
            <label htmlFor="">Provinsi</label>
            <select
              defaultValue="default"
              // name="provinsi"
              // value={data.provinsi}
              onChange={(e) => setIdProvinsi(e.target.value)}
              // onChange={handleChange}
            >
              <option value="default" disabled hidden>
                Pilih Provinsi
              </option>
              {provinsi.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <label htmlFor="">Kab/Kota</label>
            <select
              defaultValue="default"
              onChange={(e) => setIdKotaKabupaten(e.target.value)}
            >
              <option value="default" disabled hidden>
                Pilih Kab/Kota
              </option>
              {kotaKabupaten.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <label htmlFor="">Kecamatan</label>
            <select
              defaultValue="default"
              onChange={(e) => setIdKecamatan(e.target.value)}
            >
              <option value="default" disabled hidden>
                Pilih Kecamatan
              </option>
              {kecamatan.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <label htmlFor="">Kelurahan/Desa</label>
            <select defaultValue="default">
              <option value="default" disabled hidden>
                Pilih Kelurahan/Desa
              </option>
              {kelurahan.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <label htmlFor="">Alamat</label>
            <input
              type="text"
              className=""
              placeholder="Jawaban Anda"
              value={data.alamat}
              name="alamat"
              onChange={handleChange}
            />
          </div>
          <div className="row col-2">
            <div className="col">
              <label htmlFor="">RT</label>
              <input
                type="text"
                className=""
                placeholder="Jawaban Anda"
                value={data.rt}
                name="rt"
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label htmlFor="">RW</label>
              <input
                type="text"
                className=""
                placeholder="Jawaban Anda"
                value={data.rw}
                name="rw"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <label htmlFor="">Penghasilan Sebelum Pandemi</label>
            <input
              type="text"
              className=""
              placeholder="Jawaban Anda"
              value={data.penghasilanSebelumPandemi}
              name="penghasilanSebelumPandemi"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="">Penghasilan Setelah Pandemi</label>
            <input
              type="text"
              className=""
              placeholder="Jawaban Anda"
              value={data.penghasilanSetelahPandemi}
              name="penghasilanSetelahPandemi"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="">Alasan Membutuhkan Bantuan</label>
            <div className="radio-col">
              <div className="radio-item">
                <input
                  type="radio"
                  name="alasan"
                  value="Kehilangan pekerjaan"
                  checked={data.alasan === "Kehilangan pekerjaan"}
                  onChange={handleChange}
                />
                Kehilangan pekerjaan
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="alasan"
                  value="Kepala keluarga terdampak atau korban Covid-19"
                  checked={
                    data.alasan ===
                    "Kepala keluarga terdampak atau korban Covid-19"
                  }
                  onChange={handleChange}
                />
                Kepala keluarga terdampak atau korban Covid-19
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="alasan"
                  value="Tergolong fakir/miskin semenjak sebelum Covid-19"
                  checked={
                    data.alasan ===
                    "Tergolong fakir/miskin semenjak sebelum Covid-19"
                  }
                  onChange={handleChange}
                />
                Tergolong fakir/miskin semenjak sebelum Covid-19
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name="alasan"
                  value={data.alasanLainnya}
                  checked={data.alasanLainnya}
                  onChange={handleChange}
                />
                Lainnya
                <input
                  type="text"
                  id="lainnya"
                  value={data.alasanLainnya}
                  name="alasan"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="pernyataan">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="pernyataan"
                  checked={data.pernyataan}
                  onChange={handleChange}
                />
                <span className="check" />
                Saya menyatakan bahwa data yang diisikan adalah benar dan siap
                mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam
                data tersebut.
              </label>
            </div>
          </div>
          <button type="submit">Kirim</button>
        </form>
      </section>
    </>
  );
}
