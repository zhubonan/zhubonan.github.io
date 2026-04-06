---
layout: post
title: "Compiling ELPA on a local Ubuntu machine"
author: "Bonan Zhu"
categories: posts
tags: [posts, linux, ubuntu, mpi, hpc]
---

# Compiling ELPA on a local Ubuntu machine

Recently I needed a working local build of [ELPA](https://elpa.mpcdf.mpg.de/) on Ubuntu. This post records a simple recipe that worked for me with an MPI-enabled build and a local installation prefix. The steps below are aimed at a workstation or laptop rather than a cluster module environment.

## Install the required packages

On Ubuntu, the main dependencies are a Fortran compiler, OpenMPI, OpenBLAS, and ScaLAPACK. I also install the usual Autotools utilities in case the build system needs to regenerate files.

```bash
sudo apt update
sudo apt install -y \
  build-essential \
  gfortran \
  openmpi-bin \
  libopenmpi-dev \
  libopenblas-dev \
  libscalapack-openmpi-dev \
  autoconf \
  automake \
  libtool \
  pkg-config \
  m4 \
  perl
```

The important point is to keep the MPI stack consistent. On Ubuntu that usually means using the OpenMPI-flavored ScaLAPACK package together with the OpenMPI compiler wrappers.

## Configure and build ELPA

Assuming you have already unpacked the ELPA source tarball, I recommend building in a separate `build/` directory:

```bash
mkdir -p build
cd build

../configure \
  FC=mpifort \
  CC=mpicc \
  CXX=mpicxx \
  --prefix="$HOME/local/elpa/2025.06.001" \
  --libdir="$HOME/local/elpa/2025.06.001/lib" \
  --includedir="$HOME/local/elpa/2025.06.001/include" \
  --enable-openmp \
  --enable-shared \
  CFLAGS='-O2 -march=native' \
  FCFLAGS='-O2 -march=native' \
  CXXFLAGS='-O2 -march=native' \
  SCALAPACK_LDFLAGS='-lscalapack-openmpi' \
  BLAS_LDFLAGS='-lopenblas' \
  --disable-avx512-kernels

make -j"$(nproc)"
make install
```

This installs ELPA into `$HOME/local/elpa/2025.06.001` instead of writing into a system path such as `/usr/local`.

## Why these flags matter

There are three choices above that solved the build reliably for me:

1. `FC=mpifort`, `CC=mpicc`, and `CXX=mpicxx` make sure ELPA is built against the MPI toolchain you actually intend to use.
2. `SCALAPACK_LDFLAGS='-lscalapack-openmpi'` and `BLAS_LDFLAGS='-lopenblas'` force the linker to use the Ubuntu package names for ScaLAPACK and BLAS/LAPACK.
3. `--disable-avx512-kernels` avoids configure-time problems on systems where ELPA enables aggressive SIMD kernels but the local compiler flags or CPU support do not line up cleanly.

I also found it helpful to keep

```bash
CFLAGS='-O2 -march=native'
FCFLAGS='-O2 -march=native'
CXXFLAGS='-O2 -march=native'
```

so the compiler targets the local machine cleanly.

## Check the installation

After `make install`, I usually verify that the shared library and pkg-config metadata are present:

```bash
ls $HOME/local/elpa/2025.06.001/lib/libelpa*.so*
pkg-config --variable=libdir elpa
```

If `pkg-config` cannot find ELPA, add the install location to your environment:

```bash
export PKG_CONFIG_PATH=$HOME/local/elpa/2025.06.001/lib/pkgconfig:$PKG_CONFIG_PATH
export LD_LIBRARY_PATH=$HOME/local/elpa/2025.06.001/lib:$LD_LIBRARY_PATH
```

These two variables are especially useful when the installation lives under your home directory rather than a system library path.

## A note for ABACUS users

If you are compiling ELPA for use with ABACUS, keep OpenMP enabled and prefer a shared-library build. In that case, it is also a good idea to use the MPI compiler wrappers explicitly and make sure the OpenMP ELPA library variant is installed, since ABACUS typically links against `-lelpa_openmp`.

## Final remarks

The main trap was not missing BLAS or ScaLAPACK packages. The more subtle issue was ELPA's SIMD kernel selection during configure. Once I used the MPI wrappers, pointed the linker to Ubuntu's OpenMPI math libraries, and disabled AVX512 kernels, the build was straightforward.
