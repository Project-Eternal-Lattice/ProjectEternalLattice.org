# Verification scripts for ColdRead_Audit_Response_v1.0 — for Keystone's independent reproduction
# Part 1: Landau identity + bound curve (numpy). Part 2: null affine parameters + bounce scope (sympy).
# See document for context. Run: python3 verification_landau_and_geodesics.py
import numpy as np, sympy as sp

# --- Part 1: Landau identity & envelope ---
sx = np.array([[0,1],[1,0]],dtype=complex); sz = np.array([[1,0],[0,-1]],dtype=complex)
obs = lambda a: np.cos(a)*sz + np.sin(a)*sx
rng = np.random.default_rng(0); dev = 0
for _ in range(200):
    a0,a1,b0,b1 = rng.uniform(0,2*np.pi,4)
    A0,A1,B0,B1 = map(obs,(a0,a1,b0,b1))
    B = np.kron(A0,B0)+np.kron(A0,B1)+np.kron(A1,B0)-np.kron(A1,B1)
    dev = max(dev, np.abs(B@B - (4*np.eye(4) - np.kron(A0@A1-A1@A0, B0@B1-B1@B0))).max())
print("Landau identity max deviation:", dev)
for alpha,beta in [(np.pi/2,np.pi/2),(np.pi/3,np.pi/4),(0.2,0.9)]:
    A0,A1,B0,B1 = obs(0),obs(alpha),obs(0),obs(beta)
    tau = np.sqrt(np.linalg.norm(A0@A1-A1@A0,2)*np.linalg.norm(B0@B1-B1@B0,2)/4)
    B = np.kron(A0,B0)+np.kron(A0,B1)+np.kron(A1,B0)-np.kron(A1,B1)
    print(f"tau={tau:.4f}  2sqrt(1+t^2)={2*np.sqrt(1+tau**2):.6f}  ||B||={np.linalg.norm(B,2):.6f}")

# --- Part 2: null affine parameter, conformal vs non-conformal ---
S = sp.symbols('S', positive=True)
f2 = 4*S**2/(S**2-4); f = sp.sqrt(f2)
print("conformal: Int_2^3 f^2 dS =", sp.integrate(f2,(S,2,3)))      # expect oo (null-sealed)
print("non-conformal: Int_2^3 f dS =", sp.integrate(f,(S,2,3)))      # expect 2*sqrt(5) (finite)
