using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using SocketIO;

public class NetworkClient : SocketIOComponent
{
    [SerializeField]
    private Transform networkContainer;

    private Dictionary<string, GameObject> serverObjects;
    // Start is called before the first frame update
    public override void Start()
    {
        base.Start();
        initialize();
        setupEvents();
    }

    private void initialize()
    {
        serverObjects = new Dictionary<string, GameObject>();
    }
    // Update is called once per frame
    public override void Update()
    {
        base.Update();
        
    }

    private void setupEvents()
    {
        On("open", (E) =>
         {
             Debug.Log("Connection made");
         });
        On("register", (E) =>
        {
        string id = E.data["id"].ToString();
            Debug.LogFormat("Client ID ({0})", id);
        });
        On("spawn", (E) =>
        {
            string id = E.data["id"].ToString();
            GameObject go = new GameObject("Server ID: " + id);
            go.transform.SetParent(networkContainer);
            serverObjects.Add(id, go);
        });
        On("disconnected", (E) =>
        {

            string id = E.data["id"].ToString();
            GameObject go = serverObjects[id];
            Destroy(go);
            serverObjects.Remove(id);
        });
    }
}
