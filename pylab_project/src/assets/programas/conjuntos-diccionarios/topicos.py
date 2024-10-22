le_gusta_plantas = {6, 12, 15, 18, 23, 24}
le_gusta_ecologia = {1, 4, 5, 10, 15, 18, 19, 20, 21, 25}
le_gusta_genetica = {3, 4, 6, 19, 22}
solo_le_gusta_genetica = le_gusta_genetica.difference(le_gusta_plantas, le_gusta_ecologia)
 
print(solo_le_gusta_genetica)

le_gusta_todo = le_gusta_genetica.intersection(le_gusta_plantas, le_gusta_ecologia)
 
print(le_gusta_todo)